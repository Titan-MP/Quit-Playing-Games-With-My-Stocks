import React from "react";
import { Typography, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";


                                                                /* ==================== CONSTANTS ===================== */

                                                                /* ---------- FORMIK AND YUP CONFIGURATIONS ----------- */
                                                                /* Initial values for formik form                       */
const initialValues = {
	initialFunding: ""
};

                                                                /* Schema for yup validation                            */
const userSchema = yup.object().shape({
	initialFunding: yup.number().required("Initial funding amount is required")
});


                                                                /* ==================== COMPONENTS ==================== */
                                                                
                                                                /* ------------- FORM: PREPARE PORTFOLIO -------------- */
const PreparePortfolioForm = () => {
    return (
        <React.Fragment>
            <Typography
                variant="h3"
                align="center"
                paddingBottom="30px"
            >
                Prepare Your Portfolio
            </Typography>
            <Typography
                variant="h5"
                align="center"
                paddingBottom="30px"
            >
                How much money would you like to start with?
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
                            id="initialFunding"
                            label="Initial Funding"
                            type="number"
                            fullWidth
                            value={values.initialFunding}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.initialFunding && Boolean(errors.initialFunding)}
                            helperText={touched.initialFunding && errors.initialFunding}
                        />
                    </form>
                )}
            </Formik>
        </React.Fragment>
    );
}

export default PreparePortfolioForm;
