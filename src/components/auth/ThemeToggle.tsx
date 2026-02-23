import { Tooltip, IconButton } from "@/lib/mui";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export interface ThemeToggleProps {
  mode: "light" | "dark";
  onToggle: () => void;
}

export function ThemeToggle({ mode, onToggle }: ThemeToggleProps) {
  return (
    <Tooltip title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}>
      <IconButton
        onClick={onToggle}
        sx={{ position: "fixed", top: 16, right: 16 }}
        aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
      >
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
}
