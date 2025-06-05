import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const StyledMuiBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary[300],
  boxShadow: theme.palette.shadow.soft,
  padding: `${theme.spacing(3)} ${theme.spacing(12)}`,
  position: "relative",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
}));

const Logo = styled("img")(() => ({
  width: 120,
}));

export default function Header() {
  return (
    <StyledMuiBox>
      <Logo src='/assets/Logo-Secondary.svg' alt='logo' />
    </StyledMuiBox>
  );
}
