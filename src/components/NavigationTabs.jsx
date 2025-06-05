import { useState } from "react";
import { Link } from "react-router";
import { useTheme } from "@mui/material/styles";
import { Box, Tab, Tabs } from "@mui/material";

export default function NavigationTabs() {
  const theme = useTheme();
  const [value, setValue] = useState("inventory");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary[200],
        boxShadow: theme.palette.shadow.big,
        px: 10,
        py: 0,
        position: "relative",
        zIndex: 1,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        textColor={theme.palette.primary[800]}
        aria-label='navigation tabs'
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.primary[800],
            width: "54px !important",
            height: 4,
            borderRadius: "10px 10px 0 0",
            transform: "translateX(calc((120px - 54px) / 2))",
            transition: "all 0.3s cubic-bezier(0, -0.55, 0.265, 2)",
          },
          "& .Mui-selected": {
            fontWeight: 700,
          },
        }}
      >
        <Tab
          value='inventory'
          label='Inventário'
          component={Link}
          to='/'
          disableRipple
          sx={{ py: 3, width: 120 }}
        />
        <Tab
          value='store'
          label='Vendedor'
          component={Link}
          to='/store'
          disableRipple
          sx={{ py: 3, width: 120 }}
        />
        <Tab
          value='loot'
          label='Baú'
          component={Link}
          to='/loot'
          disableRipple
          sx={{ py: 3, width: 120 }}
        />
      </Tabs>
    </Box>
  );
}
