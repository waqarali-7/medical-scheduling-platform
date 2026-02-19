-- Medical Scheduling Platform – Supabase schema
-- Aligned with: SoftWave Solutions – Medical Appointment RFP (Phase 1 / MVP)
-- Run in Supabase SQL Editor: Dashboard → SQL Editor → New query
-- Timezone: store in UTC (timestamptz); application displays Europe/Berlin per RFP.

create extension if not exists "uuid-ossp";

-- ─── Clinics ─────────────────────────────────────────────────────────────────
create table public.clinics (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  address jsonb not null default '{}',  -- { street, city, postalCode, state, country }
  phone text not null,
  email text not null,
  website text,
  opening_hours jsonb not null default '{}',  -- { monday: { isOpen, from?, to? }, ... }
  specializations text[] not null default '{}',
  rating numeric(3,2) default 0,
  review_count int default 0,
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Profiles (RFP: Role-based – Patient, Doctor, Clinic Admin) ──────────────
-- Link to auth.users(id) when using Supabase Auth / JWT
create table public.profiles (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  phone text not null default '',
  role text not null check (role in ('PATIENT', 'DOCTOR', 'CLINIC_ADMIN')),
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  -- Patient-specific (nullable for non-patients)
  date_of_birth date,
  insurance_number text,
  address jsonb,
  medical_history text[],
  -- Doctor-specific
  specialization text,
  qualifications text[],
  clinic_id uuid references public.clinics(id),
  rating numeric(3,2) default 0,
  review_count int default 0,
  bio text,
  languages text[],
  consultation_fee numeric(10,2),
  is_available boolean default true,
  next_available_slot timestamptz
);

create index idx_profiles_role on public.profiles(role);
create index idx_profiles_clinic on public.profiles(clinic_id);
create index idx_profiles_email on public.profiles(email);

-- ─── Appointments (RFP: State machine – PENDING, CONFIRMED, CANCELLED, COMPLETED, NO_SHOW) ─
create table public.appointments (
  id uuid primary key default uuid_generate_v4(),
  patient_id uuid not null references public.profiles(id),
  doctor_id uuid not null references public.profiles(id),
  clinic_id uuid not null references public.clinics(id),
  status text not null check (status in ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW')),
  type text not null check (type in ('CONSULTATION', 'FOLLOW_UP', 'EMERGENCY', 'CHECKUP', 'SPECIALIST')),
  scheduled_at timestamptz not null,
  duration_minutes int not null default 30,
  reason text not null,
  notes text,
  cancel_reason text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  -- RFP: one-way sync to Google Calendar for confirmed appointments (Europe/Berlin)
  google_calendar_event_id text
);

create index idx_appointments_patient on public.appointments(patient_id);
create index idx_appointments_doctor on public.appointments(doctor_id);
create index idx_appointments_clinic on public.appointments(clinic_id);
create index idx_appointments_scheduled on public.appointments(scheduled_at);
create index idx_appointments_status on public.appointments(status);

-- ─── Appointment status history (RFP: domain events for all state changes) ───
-- Enables audit of state machine transitions; invalid transitions blocked in app layer.
create table public.appointment_status_history (
  id uuid primary key default uuid_generate_v4(),
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  from_status text not null,
  to_status text not null,
  changed_at timestamptz default now(),
  changed_by uuid references public.profiles(id)
);

create index idx_appointment_status_history_appointment on public.appointment_status_history(appointment_id);
create index idx_appointment_status_history_changed_at on public.appointment_status_history(changed_at);

-- ─── Time slots (RFP: proprietary internal calendar engine) ───────────────────
create table public.time_slots (
  id uuid primary key default uuid_generate_v4(),
  doctor_id uuid not null references public.profiles(id),
  date date not null,
  start_time time not null,
  end_time time not null,
  is_available boolean default true,
  duration_minutes int default 30,
  created_at timestamptz default now()
);

create index idx_time_slots_doctor_date on public.time_slots(doctor_id, date);

-- ─── Notifications (RFP: confirmation, cancellation, 24-hour reminders) ──────
create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id),
  type text not null check (type in ('CONFIRMATION', 'CANCELLATION', 'REMINDER', 'STATUS_CHANGE')),
  channel text not null default 'IN_APP' check (channel in ('IN_APP', 'EMAIL')),
  title text not null,
  message text not null,
  is_read boolean default false,
  appointment_id uuid references public.appointments(id),
  sent_at timestamptz,
  created_at timestamptz default now()
);

create index idx_notifications_user on public.notifications(user_id);
create index idx_notifications_appointment on public.notifications(appointment_id);
create index idx_notifications_created_at on public.notifications(created_at);

-- ─── Audit log (RFP: Full audit logging) ─────────────────────────────────────
create table public.audit_log (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  old_values jsonb,
  new_values jsonb,
  actor_id uuid references public.profiles(id),
  created_at timestamptz default now()
);

create index idx_audit_log_entity on public.audit_log(entity_type, entity_id);
create index idx_audit_log_created_at on public.audit_log(created_at);
create index idx_audit_log_actor on public.audit_log(actor_id);

-- ─── updated_at triggers ────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger clinics_updated_at
  before update on public.clinics
  for each row execute function public.set_updated_at();

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger appointments_updated_at
  before update on public.appointments
  for each row execute function public.set_updated_at();

-- ─── RLS (Row Level Security) ─────────────────────────────────────────────────
alter table public.clinics enable row level security;
alter table public.profiles enable row level security;
alter table public.appointments enable row level security;
alter table public.appointment_status_history enable row level security;
alter table public.time_slots enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_log enable row level security;

-- Demo: allow read for anon. Replace with role-based policies when JWT auth is added.
create policy "Allow read clinics" on public.clinics for select using (true);
create policy "Allow read profiles" on public.profiles for select using (true);
create policy "Allow read appointments" on public.appointments for select using (true);
create policy "Allow read appointment_status_history" on public.appointment_status_history for select using (true);
create policy "Allow read time_slots" on public.time_slots for select using (true);
create policy "Allow read notifications" on public.notifications for select using (true);
create policy "Allow read audit_log" on public.audit_log for select using (true);
