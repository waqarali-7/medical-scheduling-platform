import { Doctor } from "@/types";
import { MedicalServices } from "@/lib/mui/icons";
import { Button } from "@/lib/mui/components";
import Link from "next/link";

export default function QuickBook({ doctor }: { doctor: Doctor }) {
  return (
    <Link href={`/appointments/new?doctor=${doctor.id}`} passHref>
      <Button
        variant="primary"
        startIcon={<MedicalServices />}
        sx={{ width: "100%", py: 2, textTransform: "none" }}
      >
        Book with {doctor.firstName}
      </Button>
    </Link>
  );
}
