import { Box, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 27,
  borderRadius: 45,
  backgroundColor: theme.palette.primary[400],
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.1) inset",
  "& .MuiLinearProgress-bar": {
    borderRadius: 45,
    backgroundColor: theme.palette.primary[800],
  },
}));

export default function ExperienceProgressBar({ percentage }) {
  return (
    <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
      <StyledLinearProgress
        variant='determinate'
        value={percentage}
        sx={{ flexGrow: 1 }}
      />
    </Box>
  );
}
