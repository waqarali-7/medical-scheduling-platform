import { Doctor } from "@/types";
import { MedicalServices } from "@mui/icons-material";
import { Button } from "@/lib/mui";
import Link from "next/link";

export default function QuickBook({ doctor }: { doctor: Doctor }) {
  return (
    <Link href={`/appointments/new?doctor=${doctor.id}`} passHref>
      <Button
        variant="contained"
        color="primary"
        startIcon={<MedicalServices />}
        sx={{ width: "100%", py: 2, textTransform: "none" }}
      >
        Book with {doctor.firstName}
      </Button>
    </Link>
  );
}
