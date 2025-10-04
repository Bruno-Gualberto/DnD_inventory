import { Box, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CharacterStats from "./CharacterStats";

const StyledMuiPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary[50],
  boxShadow: "none",
  borderRadius: "10px",
  padding: "24px",
}));

export default function CharacterInfo({ characterInfo }) {
  console.log(characterInfo);
  const characterStats = {
    name: characterInfo.name,
    experience: characterInfo.experience,
    level: characterInfo.level,
    race: characterInfo.race,
    class: characterInfo.class,
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <StyledMuiPaper sx={{ flexGrow: 2, marginRight: "20px" }}>
        <CharacterStats characterStats={characterStats} />
      </StyledMuiPaper>

      <StyledMuiPaper sx={{ flexGrow: 1 }}>
        <Typography variant='titleBold'>PESO</Typography>
      </StyledMuiPaper>

      <StyledMuiPaper sx={{ flexGrow: 1 }}>
        <Typography variant='titleBold'>BOLSA DE MOEDAS</Typography>
      </StyledMuiPaper>
    </Box>
  );
}
