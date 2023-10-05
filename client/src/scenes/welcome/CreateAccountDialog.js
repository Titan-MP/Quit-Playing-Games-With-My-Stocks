import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { SignupForm } from "../form";

const CreateAccountDialog = ({ onOpen, onClose }) => {
	const [open, setOpen] = useState(false);
	const [activeStep, setActiveStep] = React.useState(0);
	const [formValid, setFormValid] = useState(false);

	const handleFormUpdate = (validity) => {
		setFormValid(validity);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog
			open={onOpen}
			onClose={onClose}
		>
			<DialogContent>
				<SignupForm />
			</DialogContent>
		</Dialog>
	);
};

export default CreateAccountDialog;
