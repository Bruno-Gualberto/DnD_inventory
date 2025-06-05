import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import "../styles/Header.css";

export default function Header() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary[300],
        boxShadow: theme.palette.shadow.soft,
        px: 12,
        py: 3,
        position: "relative",
        zIndex: 2,
        display: "flex",
        alignItems: "center",
      }}
    >
      <img className='logo' src='/assets/Logo-Secondary.svg' alt='logo' />
    </Box>
  );
}
