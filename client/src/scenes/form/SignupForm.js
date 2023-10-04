import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import {
	ADD_USER,
	ADD_WATCHLIST
} from "../../utils/mutations";
import Auth from "../../utils/auth";

const SignupForm = ({ onFormUpdate }) => {
	const [addUser, { error, data }] = useMutation(ADD_USER);
	const [addWatchlist] = useMutation(ADD_WATCHLIST);
	const defaultFundingValue = 100000;

	const userSchema = yup.object({
		username: yup.string().required("Username is required"),
		password: yup.string().required("Password is required")
	});

	const formik = useFormik({
		initialValues: {
			username: "",
			password: ""
		},
		validationSchema: userSchema,
		onSubmit: async (values) => {
			try {
				// Add user to database
				const { data } = await addUser({
					variables: {
						username: values.username,
						password: values.password,
						initialFunding: defaultFundingValue
					}
				});

				// Add default watchlist to database
				const { data: newWatchlist } = await addWatchlist({
					variables: {
						user: data.addUser.user._id,
						name: data.addUser.user.username + "'s Watchlist"
					}
				});

				Auth.login(data.addUser.token);
			} catch (e) {
				console.error("Error Creating Account: " + e);
			}
			onFormUpdate(true);
		}
	});

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
				paddingTop: "30px",
				paddingBottom: "30px",
				paddingLeft: "50px",
				paddingRight: "50px"
			}}
		>
			<Typography
				variant="h4"
				align="center"
				paddingBottom="30px"
			>
				Sign Up for an Account
			</Typography>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					formik.handleSubmit();
				}}
			>
				<TextField
					margin="dense"
					id="username"
					label="Username"
					type="text"
					fullWidth
					value={formik.values.username}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={
						formik.touched.username &&
						Boolean(formik.errors.username)
					}
					helperText={
						formik.touched.username && formik.errors.username
					}
				/>
				<TextField
					margin="dense"
					id="password"
					label="Password"
					type="password"
					fullWidth
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					error={
						formik.touched.password &&
						Boolean(formik.errors.password)
					}
					helperText={
						formik.touched.password && formik.errors.password
					}
				/>
				<Button
					type="submit"
					variant="contained"
					fullWidth
					sx={{ marginTop: "20px", marginBottom: "20px" }}
				>
					<Typography variant="body1">Create Account</Typography>
				</Button>
				{error && <Typography>Error: {error.message}</Typography>}
				{data && <Typography>Welcome to MockTrade!</Typography>}
			</form>
		</Box>
	);
};

export default SignupForm;
