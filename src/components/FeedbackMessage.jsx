import {
  Alert,
  AlertTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const StyledAlert = styled(Alert)(({ theme, severity }) => ({
  backgroundColor:
    severity === "error"
      ? theme.palette.secondary[800]
      : theme.palette.primary[800],
  color:
    severity === "error"
      ? theme.palette.secondary[50]
      : theme.palette.primary[50],
}));

export default function FeedbackMessage({ message, isOpen, isError }) {
  const [open, setOpen] = useState(isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <Close fontSize='small' />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={10000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleClose}
    >
      <StyledAlert severity={isError ? "error" : "success"} action={action}>
        <AlertTitle>
          <Typography variant='bodyBold' color='inherit'>
            {isError ? "Error" : "Success"}
          </Typography>
        </AlertTitle>
        <Typography variant='bodyRegular' color='inherit'>
          {message}
        </Typography>
      </StyledAlert>
    </Snackbar>
  );
}
