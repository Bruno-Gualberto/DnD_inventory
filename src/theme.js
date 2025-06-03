import { createTheme } from "@mui/material/styles";

// Define your custom colors
const customColors = {
  primary: {
    main: "#8BA092",
    light: "#A5BEAE",
    dark: "#708176",
    contrastText: "#FFFFFF",
    50: "#E6EDE8",
    100: "#DFE8E2",
    200: "#D0DDD5",
    300: "#C2D3C8",
    400: "#B3C8BB",
    500: "#A5BEAE",
    600: "#8BA092",
    700: "#708176",
    800: "#56635A",
    900: "#3B443F",
  },
  secondary: {
    main: "#B1433F",
    light: "#BD615E",
    dark: "#782E2B",
    contrastText: "#FFFFFF",
    50: "#E9CAC9",
    100: "#E3BBBA",
    200: "#D69D9B",
    300: "#CA7F7C",
    400: "#BD615E",
    500: "#B1433F",
    600: "#953835",
    700: "#782E2B",
    800: "#5C2321",
    900: "#401817",
  },
  tertiary: {
    main: "#B68160",
    light: "#C29579",
    dark: "#7C5841",
    contrastText: "#FFFFFF",
    50: "#EBDCD2",
    100: "#E5D2C6",
    200: "#D9BDAC",
    300: "#CDA993",
    400: "#C29579",
    500: "#B68160",
    600: "#996C51",
    700: "#7C5841",
    800: "#5F4332",
    900: "#422E23",
  },
  error: {
    main: "#f44336",
    light: "#e57373",
    dark: "#d32f2f",
    contrastText: "#fff",
  },
  warning: {
    main: "#ff9800",
    light: "#ffb74d",
    dark: "#f57c00",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  info: {
    main: "#2196f3",
    light: "#64b5f6",
    dark: "#1976d2",
    contrastText: "#fff",
  },
  success: {
    main: "#4caf50",
    light: "#81c784",
    dark: "#388e3c",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  grey: {
    main: "#FFFFFF",
    600: "#D6D6D6",
    700: "#ADADAD",
    800: "#858585",
    900: "#5C5C5C",
  },
  background: {
    default: "#EBDCD2",
  },
  // Custom colors that you can use throughout your app
  custom: {
    gold: "#ffd700",
    silver: "#c0c0c0",
    bronze: "#cd7f32",
    surface: "#ffffff",
  },
  shadow: {
    soft: "2px 4px 4px 0px rgba(0, 0, 0, 0.1)",
    big: "2px 4px 30px 0px rgba(0, 0, 0, 0.1)",
  },
};

// Create the theme
const theme = createTheme({
  palette: {
    mode: "light", // or 'dark' for dark mode
    primary: customColors.primary,
    secondary: customColors.secondary,
    tertiary: customColors.tertiary,
    error: customColors.error,
    warning: customColors.warning,
    info: customColors.info,
    success: customColors.success,
    custom: customColors.custom,
    grey: customColors.grey,
    background: customColors.background,
    shadow: customColors.shadow,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    titleBold: {
      fontSize: "32px",
      fontWeight: 700,
    },
    titleRegular: {
      fontSize: "32px",
      fontWeight: 400,
    },
    subtitleBold: {
      fontSize: "24px",
      fontWeight: 700,
    },
    subtitleRegular: {
      fontSize: "24px",
      fontWeight: 400,
    },
    ctaBold: {
      fontSize: "20px",
      fontWeight: 700,
    },
    ctaRegular: {
      fontSize: "20px",
      fontWeight: 400,
    },
    bodyBold: {
      fontSize: "16px",
      fontWeight: 700,
    },
    bodyRegular: {
      fontSize: "16px",
      fontWeight: 400,
    },
    smallBold: {
      fontSize: "12px",
      fontWeight: 700,
    },
    smallRegular: {
      fontSize: "12px",
      fontWeight: 400,
    },
  },
  components: {
    // Customize specific components
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          titleBold: "h1",
          titleRegular: "h1",
          subtitleBold: "h2",
          subtitleRegular: "h2",
          ctaBold: "p",
          ctaRegular: "p",
          bodyBold: "p",
          bodyRegular: "p",
          smallBold: "p",
          smallRegular: "p",
        },
      },
    },
  },
});

export default theme;
