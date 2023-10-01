/* ===================== IMPORTS ====================== */

import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

//Import Mutation function
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

/* ==================== CONSTANTS ===================== */

/* ---------- FORMIK AND YUP CONFIGURATIONS ----------- */
/* Initial values for formik form                       */
// const initialValues = {
//     username: "",
//     password: ""
// };

/* Schema for yup validation                            */
// const userSchema = yup.object().shape({
//     username: yup.string().required("Username is required"),    /* Username is required                                 */
//     password: yup.string().required("Password is required")     /* Password is required                                 */
// });

/* ==================== COMPONENTS ==================== */

/* -------------------- LOGIN FORM -------------------- */
const LoginForm = () => {
	const isNonMobile =
		useMediaQuery(
			"(min-width:600px)"
		); /* Check if screen is non-mobile                        */

	const [formState, setFormState] = useState({
		username: "",
		password: ""
	});

	const [login, { error }] = useMutation(LOGIN_USER);

	// const initialValues = {
	// 	username: "",
	// 	password: ""
	// };

	const userSchema = yup.object().shape({
		username: yup
			.string()
			.required(
				"Username is required"
			) /* Username is required                                 */,
		password: yup
			.string()
			.required(
				"Password is required"
			) /* Password is required                                 */
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value
		});
	};

	/* ------------------ Event Handlers ------------------ */
	/* Function to handle form submit                       */
	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await login({
				variables: { ...formState }
			});
			console.log(data);
			Auth.login(data.login.token);

			setFormState({
				username: "",
				password: ""
			});
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
		{/* <Formik
  initialValues={{
    username: "",
    password: ""
  }}
  onSubmit={handleFormSubmit}
  validationSchema={userSchema} // Define your validation schema here
>
  {({ errors, touched }) => (
    <Form>
      <Typography variant="h5" align="center" paddingBottom="30px">
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
        <Field
          type="text"
          name="username"
          as={TextField}
          label="Username"
          variant="outlined"
          fullWidth
          error={touched.username && Boolean(errors.username)}
          helperText={touched.username && errors.username}
        />
        <Field
          type="password"
          name="password"
          as={TextField}
          label="Password"
          variant="outlined"
          fullWidth
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
    </Form>
  )}
</Formik> */}


		<form onSubmit={handleFormSubmit}>
			<input
				type="text"
				placeholder="username"
				name="username"
				value={formState.username}
				onChange={handleChange}
			/>
			<input
				type="password"
				placeholder="Password"
				name="password"
				value={formState.password}
				onChange={handleChange}
			/>
			<button>submit</button>
		</form>
		</>
	);
};

export default LoginForm;
