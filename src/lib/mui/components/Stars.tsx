import { Star } from "@/lib/mui/icons";

export const renderStars = (rating: number) =>
  Array.from({ length: 5 }).map((_, i) => (
    <Star
      key={i}
      fontSize="small"
      sx={{
        color: i < Math.floor(rating) ? "warning.main" : i < rating ? "warning.light" : "grey.300",
      }}
    />
  ));
