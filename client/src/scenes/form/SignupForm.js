                                                                /* =================== IMPORTS ======================= */
import React from "react";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

                                                                /* ==================== CONSTANTS ===================== */

                                                                /* ---------- FORMIK AND YUP CONFIGURATIONS ----------- */
                                                                /* Initial values for formik form                       */
const initialValues = {
    username: "",
    password: ""
};

                                                                /* Schema for yup validation                            */
const userSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
});


                                                                /* ==================== COMPONENTS ==================== */

                                                                /* -------------------- SIGNUP FORM ------------------- */
const SignupForm = () => {
	return (
		<React.Fragment>
			<Typography
				variant="h3"
				align="center"
				paddingBottom="30px"
			>
				Create Credentials
			</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={userSchema}
				onSubmit={(values) => {
					console.log(values);
				}}
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
					</form>
				)}
			</Formik>
		</React.Fragment>
	);
};


                                                                /* ===================== EXPORTS ====================== */
export default SignupForm;
