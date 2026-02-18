import { createTheme, PaletteMode } from "@mui/material";
import { alpha } from "@mui/material/styles";

export const getAppTheme = (mode: PaletteMode) => {
  const isLight = mode === "light";

  const brandPrimary = "#0284c7";
  const brandSecondary = "#0d9488";

  return createTheme({
    shape: {
      borderRadius: 16,
    },

    palette: {
      mode,
      primary: {
        main: brandPrimary,
      },
      secondary: {
        main: brandSecondary,
      },
      background: {
        default: isLight ? "#f8fafc" : "#0f172a",
        paper: isLight ? alpha("#ffffff", 0.7) : alpha("#1e293b", 0.6),
      },
      text: {
        primary: isLight ? "#0f172a" : "#f1f5f9",
        secondary: isLight ? "#64748b" : "#94a3b8",
      },
      divider: isLight ? alpha("#0f172a", 0.08) : alpha("#ffffff", 0.08),
    },

    typography: {
      fontFamily: "var(--font-body)",
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      button: { fontWeight: 600 },
    },

    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        standard: 250,
        complex: 350,
      },
    },

    components: {
      /* ───────────────────────────── */
      /* 🌫 Glass Surfaces */
      /* ───────────────────────────── */
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            backgroundImage: "none",
            border: `1px solid ${isLight ? alpha("#ffffff", 0.4) : alpha("#ffffff", 0.08)}`,
            transition: "all 0.25s ease",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(16px)",
            border: `1px solid ${isLight ? alpha("#0f172a", 0.05) : alpha("#ffffff", 0.06)}`,
            transition: "all 0.25s ease",
            "&:hover": {
              boxShadow: isLight ? "0 10px 30px rgba(2,132,199,0.15)" : "0 10px 30px rgba(0,0,0,0.4)",
            },
          },
        },
      },

      /* ───────────────────────────── */
      /* 🔘 Buttons */
      /* ───────────────────────────── */
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            textTransform: "none",
            transition: "all 0.25s ease",
          },

          containedPrimary: {
            background: `linear-gradient(135deg, ${brandPrimary} 0%, ${brandSecondary} 100%)`,
            color: "#fff",
            boxShadow: "0 8px 20px rgba(2,132,199,0.25)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 28px rgba(2,132,199,0.35)",
            },
          },

          outlined: {
            borderColor: alpha(brandPrimary, 0.4),
            "&:hover": {
              backgroundColor: alpha(brandPrimary, 0.08),
            },
          },
        },
      },

      /* ───────────────────────────── */
      /* 📦 AppBar Glass */
      /* ───────────────────────────── */
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(18px)",
            backgroundColor: isLight ? alpha("#ffffff", 0.7) : alpha("#0f172a", 0.7),
            borderBottom: `1px solid ${isLight ? alpha("#0f172a", 0.05) : alpha("#ffffff", 0.08)}`,
          },
        },
      },

      /* ───────────────────────────── */
      /* 📝 Inputs Smooth */
      /* ───────────────────────────── */
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            transition: "all 0.2s ease",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: brandPrimary,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
            },
          },
        },
      },

      /* ───────────────────────────── */
      /* 🧩 Divider Soft */
      /* ───────────────────────────── */
      MuiDivider: {
        styleOverrides: {
          root: {
            opacity: 0.6,
          },
        },
      },
    },
  });
};
