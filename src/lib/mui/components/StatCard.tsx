"use client";

import React from "react";
import { Card, CardContent, Box, Typography, Stack } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  variant?: "default" | "info";
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, subtitle, icon, trend, trendLabel, color = "primary", variant = "default" }, ref) => {
    const isPositive = trend !== undefined && trend >= 0;

    return (
      <Card
        ref={ref}
        sx={{
          borderRadius: "16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent>
          {variant === "default" && (
            <>
              <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: "12px",
                    bgcolor: `${color}.lighter`,
                    color: `${color}.main`,
                  }}
                >
                  {icon}
                </Box>

                {trend !== undefined && (
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: "8px",
                      bgcolor: isPositive ? "success.lighter" : "error.lighter",
                      color: isPositive ? "success.dark" : "error.dark",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {isPositive ? <TrendingUpIcon fontSize="inherit" /> : <TrendingDownIcon fontSize="inherit" />}
                    {Math.abs(trend)}%
                  </Box>
                )}
              </Box>

              <Typography variant="h4" fontWeight={700} color="text.primary" mb={0.5}>
                {value}
              </Typography>

              <Typography variant="body2" fontWeight={600} color="text.secondary">
                {title}
              </Typography>

              {subtitle && (
                <Typography variant="caption" color="text.disabled" mt={0.5}>
                  {subtitle}
                </Typography>
              )}

              {trendLabel && trend !== undefined && (
                <Typography variant="caption" color="text.disabled" mt={0.5}>
                  {trendLabel}
                </Typography>
              )}
            </>
          )}

          {variant === "info" && (
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "12px",
                  bgcolor: `${color}.lighter`,
                  color: `${color}.main`,
                  display: "flex",
                }}
              >
                {icon}
              </Box>

              <Box>
                <Typography variant="h5" fontWeight={700} color="text.primary">
                  {value}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {title}
                </Typography>
              </Box>
            </Stack>
          )}
        </CardContent>
      </Card>
    );
  },
);

StatCard.displayName = "StatCard";

export default StatCard;
