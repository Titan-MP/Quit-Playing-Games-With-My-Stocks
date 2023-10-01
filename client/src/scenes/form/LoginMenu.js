import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import CreateAccountDialog from "../welcome/CreateAccountDialog";
import LoginForm from "./LoginForm";

/* -------------------- LOGIN MENU -------------------- */
const LoginMenu = (props) => {
    console.log(props)
  /* ----------------- State Variables ------------------ */
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  /* ------------------ Event Handlers ------------------ */
  /* Event handler for signup button                      */
  const handleSignupOpen = () => {
  setIsSignupOpen(true); 
  
    
    /* Show signup dialog                                   */
  };

  /* Event handler for signup dialog close                */
  const handleSignupClose = () => {
    setIsSignupOpen(
      false
    ); /* Hide signup dialog                                   */
  };

  return (
    <>
    {!isSignupOpen ?
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <LoginForm />
      <Divider sx={{ margin: "20px" }} />
      <Typography variant="body1" align="center" sx={{ padding: "10px" }}>
        Don't have an account?
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          sx={{ margin: "10px" }}
          onClick={handleSignupOpen}
        >
          <Typography variant="body1">Sign Up</Typography>
        </Button>
      </Box>
    </Box>
    :
    <CreateAccountDialog onOpen={isSignupOpen} onClose={handleSignupClose} />
    }
    </>
  );
};

/* ===================== EXPORTS ====================== */

export default LoginMenu;
