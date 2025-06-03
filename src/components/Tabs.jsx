import { Link } from "react-router";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export default function Tabs() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary[200],
        boxShadow: theme.palette.shadow.big,
        px: 12,
        py: 2,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Typography variant='subtitleBold'>Abas</Typography>
      <Link to='/'>Inventário</Link>
      <Link to='/store'>Loja</Link>
      <Link to='/loot'>Loot</Link>
    </Box>
  );
}
