                                                                /* =================== IMPORTS ======================= */
import React from "react";
import { Button, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

import {useMutation} from '@apollo/client';
import { ADD_USER } from "../../utils/mutations";
import { useState } from "react";
import Auth from '../../utils/auth';

                                                                /* ==================== CONSTANTS ===================== */

                                                                /* ---------- FORMIK AND YUP CONFIGURATIONS ----------- */
                                                                /* Initial values for formik form                       */
const initialValues = {
    username: "",
    email: "",
    password: ""
};

                                                                /* Schema for yup validation                            */
const userSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required")
});


                                                                /* ==================== COMPONENTS ==================== */

                                                                /* -------------------- SIGNUP FORM ------------------- */



const SignupForm = () => {

	// const [userData, setFormState] = useState({
	// 	username: '',
	// 	password: '',
	//   });
	const [addUser, {error,data}] = useMutation(ADD_USER);
	const [username, setUsername] = useState("");              
    const [password, setPassword] = useState(""); 
	// const handleChange = () => {
	// 	const { name, value } = event.target;

	// 	setFormState({
	// 	...userData,
	// 	[name]: value,
	// 	});
	// };
	const handleFormSubmit = async (values) => {
		// event.preventDefault();
		setUsername(values.username);                           
        setPassword(values.password); 

		try {
			const {data} = await addUser({
				variables: {username: values.username, password: values.password},
			});
			Auth.login(data.addUser.token);
		} catch (e) {
			console.error(e);
		}
		setUsername('');
		setPassword('');
	}
	return (
		<React.Fragment>
			<Typography
				variant="h3"
				align="center"
				paddingBottom="30px"
			>
				Sign Up Here
			</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={userSchema}
				// onSubmit={(values) => {
				// 	console.log(values);
				// }}
				onSubmit={handleFormSubmit}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit
				}) => (
					<form onSubmit={handleSubmit}>
						<TextField
							margin="dense"
							id="username"
							label="Username"
							type="text"
							fullWidth
							value={values.username}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.username && Boolean(errors.username)}
							helperText={touched.username && errors.username}
						/>
						<TextField
							margin="dense"
							id="email"
							label="Email Address"
							type="email"
							fullWidth
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.email && Boolean(errors.email)}
							helperText={touched.email && errors.email}
						/>
						<TextField
							margin="dense"
							id="password"
							label="Password"
							type="password"
							fullWidth
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.password && Boolean(errors.password)}
							helperText={touched.password && errors.password}
						/>
						<Button
							type="submit"
							variant="contained"
							size="large"
							color="primary"
						>
							<Typography variant="body1">Submit</Typography>
						</Button>
					</form>
				)}
			</Formik>
		</React.Fragment>
	);
};


                                                                /* ===================== EXPORTS ====================== */
export default SignupForm;
