import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import Container from "@material-ui/core/Container";
import { Link as NavLink, Redirect } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useFormik } from "formik";
import * as yup from "yup";

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
});

function MyFaceBookLogin() {
    return (
        <FacebookLogin
            appId="133304578333329"
            fields="name,email,picture"
            callback={(response) => {
                console.log(response);
                fetch("http://localhost:4000/users/login/facebook", {
                    method: "POST",
                    body: JSON.stringify({
                        access_token: response.accessToken,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "*/*",
                    },
                    mode: "cors",
                }).then((response) => {
                    response.json().then((json) => {
                        console.log(json);
                    });
                });
            }}
            render={(props) => (
                <Button variant="contained" onClick={props.onClick}>
                    login with facebook
                </Button>
            )}
        />
    );
}

function SignIn() {
    const [state, setState] = React.useState({
        redirect: null,
        error: null,
    });
    const setRedirect = (redirect) =>
        setState({
            ...state,
            redirect,
        });
    const setError = (error) => {
        setState({
            ...state,
            error,
        });
    };
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(
                    "http://localhost:4000/users/signin",
                    {
                        method: "POST",
                        body: JSON.stringify(values, null, 2),
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
                } else if (!json.success) {
                    setError(json.message);
                }
            } catch (e) {
                console.log(e);
            }
        },
    });
    if (state.redirect) {
        return <Redirect to={state.redirect} />;
    }
    return (
        <Container component="main" maxWidth="xs">
            <div
                style={{
                    marginTop: 36,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar
                    style={{
                        margin: 8,
                        backgroundColor: "blue",
                    }}
                >
                    <LockOutlinedIcon />
                </Avatar>
                <Collapse in={!!state.error}>
                    <Typography variant="subtitle1" style={{ color: "red" }}>
                        {state.error}
                    </Typography>
                </Collapse>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    style={{
                        width: "100%", // Fix IE 11 issue.
                        marginTop: 8,
                    }}
                    onSubmit={formik.handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.email && Boolean(formik.errors.email)
                        }
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                            formik.touched.password && formik.errors.password
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ margin: "24px 0px 16px" }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                component={NavLink}
                                to="/signup"
                                variant="body2"
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignIn;
