"use client";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Card from "@/components/ui/Card";
import Divider from "@/components/ui/Divider";
import IconButton from "@/components/ui/IconButton";
import type { Doctor } from "@/types";
import { CLINICS } from "@/data/dummy";
import { cn, formatCurrency } from "@/lib/utils";
import {
  Star as StarIcon,
  LocationOn as LocationOnIcon,
  Public as PublicIcon,
  AccessTime as AccessTimeIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

interface DoctorCardProps {
  doctor: Doctor;
  compact?: boolean;
}

export default function DoctorCard({ doctor, compact = false }: DoctorCardProps) {
  const clinic = CLINICS.find((c) => c.id === doctor.clinicId);

  return (
    <Link href={`/doctors/${doctor.id}`} style={{ textDecoration: "none" }}>
      <Card className="p-5 rounded-2xl border border-gray-100 hover:shadow-md hover:border-sky-200 transition-all duration-200 cursor-pointer group">
        <div className="flex items-start gap-4">
          <Avatar
            src={doctor.avatarUrl}
            firstName={doctor.firstName.replace("Dr. ", "")}
            lastName={doctor.lastName}
            size="lg"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {doctor.firstName} {doctor.lastName}
                </h3>
                <p className="text-xs text-sky-600 font-medium mt-0.5">{doctor.specialization}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <StarIcon className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-semibold text-gray-700">{doctor.rating.toFixed(1)}</span>
                <span className="text-xs text-gray-400">({doctor.reviewCount})</span>
              </div>
            </div>

            {!compact && (
              <>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                  <LocationOnIcon className="h-4 w-4 text-gray-400" />
                  <span className="truncate">
                    {clinic?.name}, {clinic?.address.city}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                  <PublicIcon className="h-4 w-4 text-gray-400" />
                  <span>{doctor.languages.join(", ")}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                  <AccessTimeIcon className="h-4 w-4 text-gray-400" />
                  <span>
                    Next:{" "}
                    {doctor.nextAvailableSlot
                      ? new Date(doctor.nextAvailableSlot).toLocaleDateString("de-DE", {
                          day: "numeric",
                          month: "short",
                        })
                      : "Not available"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {!compact && (
          <>
            <Divider className="my-4 border-gray-50" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Consultation fee</p>
                <p className="text-sm font-semibold text-gray-800">{formatCurrency(doctor.consultationFee)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full",
                    doctor.isAvailable ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-500",
                  )}
                >
                  <span
                    className={cn("h-1.5 w-1.5 rounded-full", doctor.isAvailable ? "bg-emerald-500" : "bg-gray-400")}
                  />
                  {doctor.isAvailable ? "Available" : "Unavailable"}
                </span>
                <IconButton>
                  <ChevronRightIcon className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </IconButton>
              </div>
            </div>
          </>
        )}
      </Card>
    </Link>
  );
}
