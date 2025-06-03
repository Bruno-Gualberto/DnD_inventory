import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

export default function Header() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary[300],
        boxShadow: theme.palette.shadow.soft,
        px: 12,
        py: 2,
        position: "relative",
        zIndex: 2,
      }}
    >
      <Typography variant='titleBold'>Logo</Typography>
    </Box>
  );
}
