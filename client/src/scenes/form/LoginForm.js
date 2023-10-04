/* ===================== IMPORTS ====================== */
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

/* ==================== COMPONENTS ==================== */

/* -------------------- LOGIN FORM -------------------- */
const LoginForm = () => {
	const isNonMobile = useMediaQuery("(min-width:600px)");
	const [login, { error, data }] = useMutation(LOGIN_USER);

	/* ---------- Formik and Yup Configurations ----------- */
	/* Yup validation schema                       			*/
	const userSchema = yup.object().shape({
		username: yup.string().required("Username is required"),
		password: yup.string().required("Password is required")
	});

	/* Formik configuration 									*/
	const formik = useFormik({
		initialValues: {
			username: "",
			password: ""
		},
		validationSchema: userSchema,
		onSubmit: async (values) => {
			try {
				const { data } = await login({
					variables: {
						username: values.username,
						password: values.password
					}
				});
				console.log(data);
				Auth.login(data.login.token);
			} catch (e) {
				console.error("Error Logging In: " + e);
			}
		}
	});

	return (
		<form onSubmit={formik.handleSubmit}>
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
					type="text"
					name="username"
					label="Username"
					variant="outlined"
					fullWidth
					error={
						formik.touched.username &&
						Boolean(formik.errors.username)
					}
					helperText={
						formik.touched.username && formik.errors.username
					}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.username}
				/>
				<TextField
					type="password"
					name="password"
					label="Password"
					variant="outlined"
					fullWidth
					error={
						formik.touched.password &&
						Boolean(formik.errors.password)
					}
					helperText={
						formik.touched.password && formik.errors.password
					}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
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
				{error && (
					<Typography
						variant="body1"
						color="error"
					>
						{error.message}
					</Typography>
				)}
			</Box>
		</form>
	);
};

export default LoginForm;
