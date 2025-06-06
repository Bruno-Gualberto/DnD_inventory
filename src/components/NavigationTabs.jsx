import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { styled } from "@mui/material/styles";
import { Box, Tab, Tabs } from "@mui/material";

const StyledMuiBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary[200],
  boxShadow: theme.palette.shadow.big,
  padding: `${theme.spacing(0)} ${theme.spacing(10)}`,
  position: "relative",
  zIndex: 1,
}));

const StyledMuiTabs = styled(Tabs)(({ theme }) => ({
  color: theme.palette.primary[800],
  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.primary[800],
    width: "54px !important",
    height: theme.spacing(0.5),
    borderRadius: "10px 10px 0 0",
    transform: "translateX(calc((120px - 54px) / 2))",
    transition: "all 0.3s cubic-bezier(0, -0.55, 0.265, 2)",
  },
  "& .Mui-selected.MuiTab-root": {
    color: theme.palette.primary[800],
    fontWeight: 700,
  },
}));

export default function NavigationTabs() {
  const location = useLocation();
  const [value, setValue] = useState("inventory");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setValue("inventory");
        break;
      case "/store":
        setValue("store");
        break;
      case "/loot":
        setValue("loot");
        break;
      default:
        setValue("inventory");
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledMuiBox>
      <StyledMuiTabs
        value={value}
        onChange={handleChange}
        aria-label='navigation tabs'
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
      </StyledMuiTabs>
    </StyledMuiBox>
  );
}
