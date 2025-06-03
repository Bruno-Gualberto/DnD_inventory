import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

export default function Header() {
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.palette.primary[300],
        boxShadow: theme.palette.shadow.soft,
      }}
    >
      <Typography variant='titleBold'>Logo</Typography>
    </div>
  );
}
