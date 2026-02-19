# Connecting this app to Supabase

This guide walks you through connecting the medical scheduling platform to Supabase (database + optional auth).

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New project**, choose org, name, database password, and region.
3. Wait for the project to be ready.

## 2. Get your API keys

1. In the Supabase dashboard, open **Project Settings** (gear icon) → **API**.
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 3. Configure environment variables

1. In the project root, copy the example env file:
   ```bash
   cp .env.local.example .env.local
   ```
2. Edit `.env.local` and set:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```
   For **seeding** (optional), also add the **service_role** key (Project Settings → API → service_role, secret). Never use it in the browser or commit it:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   ```

Do not commit `.env.local` (it should already be in `.gitignore`).

## 4. Create the database schema

1. In Supabase: **SQL Editor** → **New query**.
2. Open `supabase/schema.sql` in this repo and copy its full contents.
3. Paste into the SQL Editor and click **Run**.

This creates tables: `clinics`, `profiles`, `appointments`, `time_slots`, `notifications`, `audit_log`, `appointment_status_history`, with indexes and basic RLS policies for read access.

### 4b. Seed the database (optional)

To load demo data from `src/data/dummy.ts` into Supabase:

1. Add **SUPABASE_SERVICE_ROLE_KEY** to `.env.local` (Project Settings → API → **service_role** key, the secret one). The seed script needs it because RLS only allows *read* for anon; the service role bypasses RLS for inserts.
2. Run: `npm run seed`

The script inserts clinics, profiles (patients, doctors, admins), appointments, time slots, and notifications. You can run it again on an empty database; if tables already have rows, the script will append (and may hit unique constraints on email). To start fresh, clear the tables in the Supabase Table Editor or run a `DELETE FROM …` for each table, then run `npm run seed` again.

## 5. Use the Supabase client in the app

- **Client Components (browser):** use the client that reads env in the browser:
  ```ts
  import { createClient } from "@/lib/supabase/client";
  const supabase = createClient();
  const { data } = await supabase.from("appointments").select("*");
  ```
- **Server Components / API routes / Server Actions:** use the server client:
  ```ts
  import { createClient } from "@/lib/supabase/server";
  const supabase = createClient();
  const { data } = await supabase.from("appointments").select("*");
  ```

Files added for you:

- `src/lib/supabase/client.ts` – browser client
- `src/lib/supabase/server.ts` – server client
- `supabase/schema.sql` – table definitions matching your types
- `.env.local.example` – env template

## 6. Switch from dummy data to Supabase

Right now the app uses in-memory data from `src/data/dummy.ts`. To use Supabase instead:

1. **Fetch appointments (e.g. list page)**  
   Replace `getHydratedAppointments()` with a Supabase query that joins `appointments` with `profiles` (patient, doctor) and `clinics`, then map the result to your `Appointment` type (including `patient`, `doctor`, `clinic`).

2. **Single appointment**  
   Replace `getAppointmentById(id)` with a Supabase `select` with the same joins, by `id`.

3. **Clinics / doctors**  
   Replace `CLINICS` and `DOCTORS` with `supabase.from("clinics").select("*")` and `supabase.from("profiles").select("*").eq("role", "DOCTOR")`, then map to your types.

4. **Optional: feature flag**  
   Use an env var (e.g. `NEXT_PUBLIC_USE_SUPABASE=true`) and branch in code: if set, use Supabase; otherwise use dummy data. That way you can develop without Supabase or compare behavior.

## 7. Optional: Supabase Auth

To use Supabase for login (email/password, OAuth, etc.):

1. Install the SSR package (recommended for Next.js):
   ```bash
   npm install @supabase/ssr
   ```
2. Follow [Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs): use `createBrowserClient` and `createServerClient` from `@supabase/ssr` instead of the current `createClient` in `client.ts` and `server.ts` so auth cookies work correctly.
3. Link `profiles.id` to `auth.users.id` (e.g. trigger that creates a row in `profiles` on signup).

## 8. Column naming: DB vs app

The schema uses `snake_case` (e.g. `first_name`, `scheduled_at`). Your TypeScript types use `camelCase`. When you read rows, either:

- Map in code: `firstName: row.first_name`, etc., or
- Use a small helper that converts all keys to camelCase, or
- Rely on Supabase type generation and keep one canonical mapping layer (e.g. in `src/lib/supabase/mappers.ts`).

## Quick test

After setting env and running the schema:

```ts
// In a Server Component or API route
import { createClient } from "@/lib/supabase/server";

export default async function TestPage() {
  const supabase = createClient();
  const { data, error } = await supabase.from("clinics").select("*").limit(1);
  return <pre>{JSON.stringify({ data, error }, null, 2)}</pre>;
}
```

If you see `data: []` and `error: null`, the connection works. You can then seed data via the Supabase Table Editor or a seed script.
