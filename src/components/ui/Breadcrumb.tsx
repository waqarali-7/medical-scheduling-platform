"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Stack, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showBackButton?: boolean;
}

export default function Breadcrumb({ items, showBackButton = false }: BreadcrumbProps) {
  const router = useRouter();

  return (
    <Stack direction="row" spacing={1.5} alignItems="center" mb={3}>
      {showBackButton && (
        <Button variant="text" startIcon={<ArrowBackIcon />} size="small" onClick={() => router.back()}>
          Back
        </Button>
      )}

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Stack key={index} direction="row" spacing={1} alignItems="center">
            {index !== 0 && (
              <Typography color="text.disabled" fontSize={14}>
                /
              </Typography>
            )}

            {item.href && !isLast ? (
              <Link href={item.href} style={{ textDecoration: "none" }}>
                <Typography fontSize={14} color="primary.main" sx={{ cursor: "pointer" }}>
                  {item.label}
                </Typography>
              </Link>
            ) : (
              <Typography fontSize={14} color={isLast ? "text.primary" : "text.secondary"}>
                {item.label}
              </Typography>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
}
