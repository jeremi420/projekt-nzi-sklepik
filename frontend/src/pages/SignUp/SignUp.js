import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import LoadingButton from "@material-ui/lab/LoadingButton";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import { Link as NavLink, Redirect } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .matches("(?=.*[a-z])", "password must contain one lower case letter")
        .matches("(?=.*[A-Z])", "password must contain one upper case letter")
        .matches("(?=.*[0-9])", "password must contain one number")
        .required("Password is required"),
    password2: yup
        .string("Enter your password")
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Password is required"),
    firstName: yup
        .string("Enter your first name")
        .matches(
            "^[A-Z][a-z]*",
            "must start with capital letter and contain only letters"
        )
        .required("First name is required"),
    lastName: yup
        .string("Enter your last name")
        .matches(
            "^[A-Z][a-z]*",
            "must start with capital letter and contain only letters"
        )
        .required("Last name is required"),
});

function SignUp() {
    const [redirect, setRedirect] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [pending, setPending] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            password2: "",
            firstName: "",
            lastName: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log("1");
            setPending(true);
            try {
                const response = await fetch(
                    "http://localhost:4000/users/signup",
                    {
                        method: "POST",
                        body: JSON.stringify(values),
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "*/*",
                        },
                        mode: "cors",
                    }
                );
                const json = await response.json();
                if (json.success) {
                    setRedirect(json.redirect);
                }
                if (!json.success) {
                    setError(json.message);
                }
            } catch (e) {
                console.log(e);
            } finally {
                console.log("2");
                setPending(false);
            }
        },
    });
    if (redirect) {
        return <Redirect to={redirect} />;
    }
    return (
        <Container component="main" maxWidth="xs">
            <div
                style={{
                    marginTop: 64,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Collapse in={!!error}>
                    <Typography variant="subtitle1" style={{ color: "red" }}>
                        {error}
                    </Typography>
                </Collapse>
                <Avatar
                    style={{
                        margin: 8,
                        backgroundColor: "blue",
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form
                    style={{
                        width: "100%", // Fix IE 11 issue.
                        marginTop: 24,
                    }}
                    onSubmit={formik.handleSubmit}
                    noValidate
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                autoFocus
                                error={
                                    formik.touched.firstName &&
                                    Boolean(formik.errors.firstName)
                                }
                                helperText={
                                    formik.touched.firstName &&
                                    formik.errors.firstName
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.lastName &&
                                    Boolean(formik.errors.lastName)
                                }
                                helperText={
                                    formik.touched.lastName &&
                                    formik.errors.lastName
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.email &&
                                    Boolean(formik.errors.email)
                                }
                                helperText={
                                    formik.touched.email && formik.errors.email
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.password &&
                                    Boolean(formik.errors.password)
                                }
                                helperText={
                                    formik.touched.password &&
                                    formik.errors.password
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password2"
                                label="Password confirm"
                                type="password"
                                id="password2"
                                autoComplete="current-password"
                                value={formik.values.password2}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.password2 &&
                                    Boolean(formik.errors.password2)
                                }
                                helperText={
                                    formik.touched.password2 &&
                                    formik.errors.password2
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
                        pending={pending}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{
                            margin: "24px 0px 16px",
                        }}
                    >
                        Sign Up
                    </LoadingButton>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link
                                component={NavLink}
                                to="/signin"
                                variant="body2"
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignUp;
