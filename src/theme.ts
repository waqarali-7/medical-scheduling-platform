import { createTheme, PaletteMode } from "@mui/material";
import { alpha } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
  }
}

export const getAppTheme = (mode: PaletteMode) => {
  const isLight = mode === "light";

  const brandPrimary = "#0ea5e9";
  const brandSecondary = "#14b8a6";
  const brandAccent = "#8b5cf6";

  return createTheme({
    shape: {
      borderRadius: 8,
    },

    palette: {
      mode,
      primary: {
        main: brandPrimary,
        light: "#38bdf8",
        dark: "#0284c7",
        contrastText: "#ffffff",
        lighter: "#e0f2fe",
      },
      secondary: {
        main: brandSecondary,
        light: "#2dd4bf",
        dark: "#0f766e",
        lighter: "#ccfbf1",
      },
      success: {
        main: "#10b981",
        light: "#34d399",
        dark: "#059669",
        lighter: "#d1fae5",
      },
      error: {
        main: "#ef4444",
        light: "#f87171",
        dark: "#dc2626",
        lighter: "#fee2e2",
      },
      warning: {
        main: "#f59e0b",
        light: "#fbbf24",
        dark: "#d97706",
        lighter: "#fef3c7",
      },
      info: {
        main: "#3b82f6",
        light: "#60a5fa",
        dark: "#2563eb",
        lighter: "#dbeafe",
      },
      background: {
        default: isLight ? "#fafbfc" : "#0a0e1a",
        paper: isLight ? "#ffffff" : "#151b2e",
      },
      text: {
        primary: isLight ? "#0f172a" : "#f8fafc",
        secondary: isLight ? "#475569" : "#cbd5e1",
        disabled: isLight ? "#94a3b8" : "#64748b",
      },
      divider: isLight ? alpha("#0f172a", 0.06) : alpha("#ffffff", 0.06),
      grey: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
      },
    },

    typography: {
      fontFamily: "var(--font-body)",
      h1: {
        fontWeight: 800,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontWeight: 800,
        letterSpacing: "-0.02em",
      },
      h3: {
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      h4: {
        fontWeight: 700,
        letterSpacing: "-0.01em",
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
        letterSpacing: "0.01em",
      },
      body1: {
        lineHeight: 1.6,
      },
      body2: {
        lineHeight: 1.5,
      },
    },

    shadows: [
      "none",
      isLight ? "0 2px 8px rgba(15,23,42,0.04)" : "0 2px 8px rgba(0,0,0,0.3)",
      isLight ? "0 4px 12px rgba(15,23,42,0.06)" : "0 4px 12px rgba(0,0,0,0.4)",
      isLight ? "0 8px 16px rgba(15,23,42,0.08)" : "0 8px 16px rgba(0,0,0,0.5)",
      isLight ? "0 12px 24px rgba(15,23,42,0.1)" : "0 12px 24px rgba(0,0,0,0.6)",
      isLight ? "0 16px 32px rgba(15,23,42,0.12)" : "0 16px 32px rgba(0,0,0,0.7)",
      isLight ? "0 20px 40px rgba(15,23,42,0.14)" : "0 20px 40px rgba(0,0,0,0.75)",
      isLight ? "0 24px 48px rgba(15,23,42,0.16)" : "0 24px 48px rgba(0,0,0,0.8)",
      isLight ? "0 2px 8px rgba(15,23,42,0.04)" : "0 2px 8px rgba(0,0,0,0.3)",
      isLight ? "0 4px 12px rgba(15,23,42,0.06)" : "0 4px 12px rgba(0,0,0,0.4)",
      isLight ? "0 8px 16px rgba(15,23,42,0.08)" : "0 8px 16px rgba(0,0,0,0.5)",
      isLight ? "0 12px 24px rgba(15,23,42,0.1)" : "0 12px 24px rgba(0,0,0,0.6)",
      isLight ? "0 16px 32px rgba(15,23,42,0.12)" : "0 16px 32px rgba(0,0,0,0.7)",
      isLight ? "0 20px 40px rgba(15,23,42,0.14)" : "0 20px 40px rgba(0,0,0,0.75)",
      isLight ? "0 24px 48px rgba(15,23,42,0.16)" : "0 24px 48px rgba(0,0,0,0.8)",
      isLight ? "0 2px 8px rgba(15,23,42,0.04)" : "0 2px 8px rgba(0,0,0,0.3)",
      isLight ? "0 4px 12px rgba(15,23,42,0.06)" : "0 4px 12px rgba(0,0,0,0.4)",
      isLight ? "0 8px 16px rgba(15,23,42,0.08)" : "0 8px 16px rgba(0,0,0,0.5)",
      isLight ? "0 12px 24px rgba(15,23,42,0.1)" : "0 12px 24px rgba(0,0,0,0.6)",
      isLight ? "0 16px 32px rgba(15,23,42,0.12)" : "0 16px 32px rgba(0,0,0,0.7)",
      isLight ? "0 20px 40px rgba(15,23,42,0.14)" : "0 20px 40px rgba(0,0,0,0.75)",
      isLight ? "0 24px 48px rgba(15,23,42,0.16)" : "0 24px 48px rgba(0,0,0,0.8)",
      isLight ? "0 2px 8px rgba(15,23,42,0.04)" : "0 2px 8px rgba(0,0,0,0.3)",
      isLight ? "0 4px 12px rgba(15,23,42,0.06)" : "0 4px 12px rgba(0,0,0,0.4)",
      isLight ? "0 8px 16px rgba(15,23,42,0.08)" : "0 8px 16px rgba(0,0,0,0.5)",
    ],

    transitions: {
      duration: {
        shortest: 120,
        shorter: 180,
        short: 200,
        standard: 280,
        complex: 350,
        enteringScreen: 250,
        leavingScreen: 200,
      },
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": {
              width: 10,
              height: 10,
            },
            "&::-webkit-scrollbar-track": {
              background: isLight ? "#f1f5f9" : "#1e293b",
            },
            "&::-webkit-scrollbar-thumb": {
              background: isLight ? "#cbd5e1" : "#475569",
              borderRadius: 5,
              "&:hover": {
                background: isLight ? "#94a3b8" : "#64748b",
              },
            },
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            border: `1px solid ${isLight ? alpha("#0f172a", 0.04) : alpha("#ffffff", 0.05)}`,
          },
          elevation1: {
            boxShadow: isLight ? "0 2px 8px rgba(15,23,42,0.04)" : "0 2px 8px rgba(0,0,0,0.3)",
          },
          elevation2: {
            boxShadow: isLight ? "0 4px 12px rgba(15,23,42,0.06)" : "0 4px 12px rgba(0,0,0,0.4)",
          },
          elevation3: {
            boxShadow: isLight ? "0 8px 16px rgba(15,23,42,0.08)" : "0 8px 16px rgba(0,0,0,0.5)",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            border: `1px solid ${isLight ? alpha("#0f172a", 0.04) : alpha("#ffffff", 0.05)}`,
            boxShadow: isLight ? "0 2px 8px rgba(15,23,42,0.04)" : "0 2px 8px rgba(0,0,0,0.3)",
            transition: "all 280ms cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: isLight
                ? "0 12px 24px rgba(14,165,233,0.12), 0 0 0 1px rgba(14,165,233,0.08)"
                : "0 12px 24px rgba(0,0,0,0.5)",
              borderColor: isLight ? alpha(brandPrimary, 0.2) : alpha(brandPrimary, 0.3),
            },
          },
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            transition: "all 220ms cubic-bezier(0.4, 0, 0.2, 1)",
          },
          sizeLarge: {
            padding: "12px 28px",
            fontSize: "1rem",
          },
          sizeMedium: {
            padding: "8px 20px",
          },
          sizeSmall: {
            padding: "5px 14px",
          },
          containedPrimary: {
            background: `linear-gradient(135deg, ${brandPrimary} 0%, ${brandSecondary} 100%)`,
            color: "#ffffff",
            boxShadow: `0 4px 14px ${alpha(brandPrimary, 0.3)}`,
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 8px 20px ${alpha(brandPrimary, 0.4)}`,
              background: `linear-gradient(135deg, ${brandPrimary} 0%, ${brandSecondary} 100%)`,
            },
            "&:active": {
              transform: "translateY(0)",
            },
          },
          containedSecondary: {
            background: brandSecondary,
            color: "#ffffff",
            "&:hover": {
              background: "#0f766e",
              transform: "translateY(-2px)",
            },
          },
          outlined: {
            borderWidth: 1.5,
            borderColor: alpha(brandPrimary, 0.3),
            color: brandPrimary,
            "&:hover": {
              borderWidth: 1.5,
              borderColor: brandPrimary,
              backgroundColor: alpha(brandPrimary, 0.04),
              transform: "translateY(-1px)",
            },
          },
          text: {
            "&:hover": {
              backgroundColor: alpha(brandPrimary, 0.06),
            },
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: alpha(brandPrimary, 0.08),
            },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          },
          filled: {
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
          outlined: {
            borderWidth: 1.5,
            "&:hover": {
              borderWidth: 1.5,
              transform: "translateY(-1px)",
            },
          },
          colorSecondary: {
            background: `linear-gradient(135deg, ${brandAccent} 0%, ${alpha(brandAccent, 0.8)} 100%)`,
            color: "#ffffff",
            border: "none",
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: alpha(brandPrimary, 0.4),
              },
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: 2,
                borderColor: brandPrimary,
              },
            },
          },
          notchedOutline: {
            borderColor: isLight ? alpha("#0f172a", 0.1) : alpha("#ffffff", 0.1),
            transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: {
            "&.Mui-focused": {
              color: brandPrimary,
            },
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backgroundColor: isLight ? alpha("#ffffff", 0.8) : alpha("#0a0e1a", 0.8),
            backdropFilter: "blur(20px)",
            borderBottom: `1px solid ${isLight ? alpha("#0f172a", 0.06) : alpha("#ffffff", 0.06)}`,
            boxShadow: "none",
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            borderRight: `1px solid ${isLight ? alpha("#0f172a", 0.06) : alpha("#ffffff", 0.06)}`,
          },
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: {
            transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",

            "&:hover": {
              backgroundColor: isLight ? alpha(brandPrimary, 0.06) : alpha(brandPrimary, 0.12),
            },

            "&.Mui-selected": {
              backgroundColor: isLight ? alpha(brandPrimary, 0.1) : alpha(brandPrimary, 0.2),

              "&:hover": {
                backgroundColor: isLight ? alpha(brandPrimary, 0.12) : alpha(brandPrimary, 0.25),
              },
            },
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isLight ? alpha("#0f172a", 0.06) : alpha("#ffffff", 0.06),
          },
        },
      },

      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
          standardSuccess: {
            backgroundColor: isLight ? "#d1fae5" : alpha("#10b981", 0.15),
            color: isLight ? "#065f46" : "#6ee7b7",
          },
          standardError: {
            backgroundColor: isLight ? "#fee2e2" : alpha("#ef4444", 0.15),
            color: isLight ? "#991b1b" : "#fca5a5",
          },
          standardWarning: {
            backgroundColor: isLight ? "#fef3c7" : alpha("#f59e0b", 0.15),
            color: isLight ? "#92400e" : "#fcd34d",
          },
          standardInfo: {
            backgroundColor: isLight ? "#dbeafe" : alpha("#3b82f6", 0.15),
            color: isLight ? "#1e40af" : "#93c5fd",
          },
        },
      },

      MuiSwitch: {
        styleOverrides: {
          root: {
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: brandPrimary,
              "& + .MuiSwitch-track": {
                backgroundColor: brandPrimary,
              },
            },
          },
        },
      },

      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            height: 8,
          },
          bar: {
            background: `linear-gradient(90deg, ${brandPrimary} 0%, ${brandAccent} 100%)`,
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isLight ? alpha("#0f172a", 0.92) : alpha("#1e293b", 0.92),

            color: isLight ? "#ffffff" : "#f8fafc",

            fontSize: "0.875rem",
            fontWeight: 500,
            borderRadius: 8,
            padding: "8px 12px",

            boxShadow: isLight ? "0 8px 24px rgba(15,23,42,0.12)" : "0 8px 24px rgba(0,0,0,0.5)",
          },

          arrow: {
            color: isLight ? alpha("#0f172a", 0.92) : alpha("#1e293b", 0.92),
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
          },
        },
      },

      MuiBackdrop: {
        styleOverrides: {
          root: {
            backgroundColor: alpha("#0f172a", 0.5),
            backdropFilter: "blur(4px)",
          },
        },
      },

      MuiFab: {
        styleOverrides: {
          root: {
            boxShadow: `0 4px 14px ${alpha(brandAccent, 0.3)}`,
            background: `linear-gradient(135deg, ${brandAccent} 0%, ${alpha(brandAccent, 0.8)} 100%)`,
            color: "#ffffff",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: `0 6px 20px ${alpha(brandAccent, 0.4)}`,
            },
          },
        },
      },
    },
  });
};
