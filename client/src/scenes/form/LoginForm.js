                                                                /* ===================== IMPORTS ====================== */

import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

//Import Mutation function
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";


                                                                /* ==================== CONSTANTS ===================== */

                                                                /* ---------- FORMIK AND YUP CONFIGURATIONS ----------- */
                                                                /* Initial values for formik form                       */
const initialValues = {
    username: "",
    password: ""
};

                                                                /* Schema for yup validation                            */
const userSchema = yup.object().shape({
    username: yup.string().required("Username is required"),    /* Username is required                                 */
    password: yup.string().required("Password is required")     /* Password is required                                 */
});


                                                                /* ==================== COMPONENTS ==================== */

                                                                /* -------------------- LOGIN FORM -------------------- */
const LoginForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");     /* Check if screen is non-mobile                        */
    const [username, setUsername] = useState("");               /* State variables - username                           */
    const [password, setPassword] = useState("");               /* State variables - password                           */

	const [login, {error}] = useMutation(LOGIN_USER);


                                                                /* ------------------ Event Handlers ------------------ */
                                                                /* Function to handle form submit                       */
    const handleFormSubmit = async (values) => {
        setUsername(values.username);                           /* Set username                                         */
        setPassword(values.password);                           /* Set password                                         */
    
		try {
			const {data} = await login({
				variables: {username: username, password: password}
			});
			Auth.login(data.login.token);
		} catch (e) {
			console.error(e);
		};
		setUsername('');
		setPassword('');
		
	};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={initialValues}
			validationSchema={userSchema}
		>
			{({
				values,
				errors,
				touched,
				handleBlur,
				handleChange,
				handleSubmit
			}) => (
				<form onSubmit={handleSubmit}>
					<Typography
						variant="h5"
						align="center"
						paddingBottom="30px"
					>
						Log In Here
					</Typography>
					<Box
						display="grid"
						gap="30px"
						gridTemplateColumns="repeat(1, minmax(0, 1fr))"
						sx={{
							"& > div": {
								gridColumn: isNonMobile ? undefined : "span 4"
							}
						}}
					>
						<TextField
							name="username"
							label="Username"
							variant="outlined"
							fullWidth
							value={values.username}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.username && Boolean(errors.username)}
							helperText={touched.username && errors.username}
						/>
						<TextField
							name="password"
							label="Password"
							variant="outlined"
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
							sx={{
								gridColumn: isNonMobile ? undefined : "span 4"
							}}
						>
							<Typography variant="body1">Login</Typography>
						</Button>
					</Box>
				</form>
			)}
		</Formik>
	);
};

export default LoginForm;
