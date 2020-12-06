import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link as NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    buttons: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const authenticated = false;

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Sklepik
                </Typography>
                {authenticated && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                )}
                {!authenticated && (
                    <div className={classes.buttons}>
                        <Button
                            color="inherit"
                            component={NavLink}
                            to="/signup"
                        >
                            sign up
                        </Button>
                        <Button
                            variant="outlined"
                            color="inherit"
                            startIcon={<AccountCircle />}
                            component={NavLink}
                            to="/signin"
                        >
                            sign in
                        </Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}
