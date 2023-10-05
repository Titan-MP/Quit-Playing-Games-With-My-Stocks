import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import CreateAccountDialog from "../welcome/CreateAccountDialog";
import LoginForm from "./LoginForm";

const LoginMenu = (props) => {
	const [isSignupOpen, setIsSignupOpen] = useState(false);

	const handleSignupOpen = () => {
		setIsSignupOpen(true);
	};

	const handleSignupClose = () => {
		setIsSignupOpen(false);
	};

	return (
		<React.Fragment>
			{!isSignupOpen ? (
				<Box
					sx={{
						padding: "20px"
					}}
				>
					<LoginForm />
					<Divider sx={{ margin: "20px" }} />
					<Typography
						variant="body1"
						align="center"
						sx={{ padding: "10px" }}
					>
						Don't have an account?
					</Typography>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center"
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
			) : (
				<CreateAccountDialog
					onOpen={isSignupOpen}
					onClose={handleSignupClose}
				/>
			)}
		</React.Fragment>
	);
};

export default LoginMenu;
