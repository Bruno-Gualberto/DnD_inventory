import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Inventory() {
  const theme = useTheme();

  return (
    <div>
      <Typography variant='titleBold'>PÁGINA DO INVENTÁRIO</Typography>
      <Button variant='contained' color='tertiary'>
        <Typography variant='ctaBold'>Adicionar Item</Typography>
      </Button>
    </div>
  );
}
