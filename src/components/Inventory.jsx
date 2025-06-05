import { Button, Typography } from "@mui/material";

export default function Inventory() {
  return (
    <div>
      <Typography variant='titleBold'>PÁGINA DO INVENTÁRIO</Typography>
      <Button variant='contained' color='tertiary'>
        <Typography variant='ctaBold'>Adicionar Item</Typography>
      </Button>
    </div>
  );
}
