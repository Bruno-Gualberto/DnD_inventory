import { Box, Typography, Avatar, useTheme } from "@mui/material";
import ExperienceProgressBar from "./ExperienceProgressBar";
import { getProgressToNextLevel } from "../utils/experienceUtils";
import { styled } from "@mui/material/styles";

const StyledChip = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.primary[200],
  color: theme.palette.grey[900],
  // height: "27px",
}));

export default function CharacterStats({ characterStats }) {
  const { palette } = useTheme();

  const { actualLevel, nextLevelXP, percentage } = getProgressToNextLevel(
    characterStats.experience,
    characterStats.level
  );

  const hasLeveledUp = actualLevel > characterStats.level;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: "16px",
        }}
      >
        <ExperienceProgressBar percentage={percentage} />
        <StyledChip variant='chip'>
          {`${characterStats.experience} XP / ${nextLevelXP} XP`}
        </StyledChip>
      </Box>
      {hasLeveledUp && (
        <Typography
          variant='smallBold'
          sx={{ color: palette.secondary.main, marginTop: "8px" }}
        >
          Level Up! Now Level {actualLevel}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: "16px",
          marginTop: "32px",
        }}
      >
        <Avatar
          alt='Lya avatar'
          src='/assets/Lya_avatar.png'
          sx={{ width: 56, height: 56, border: "2px solid #B3C8BB" }}
        />
        <Box>
          <Typography variant='bodyBold' sx={{ color: palette.grey[900] }}>
            {characterStats.name}
          </Typography>
          <Typography variant='smallRegular' sx={{ color: palette.grey[900] }}>
            Nível {characterStats.level} | {characterStats.race} |{" "}
            {characterStats.class}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
