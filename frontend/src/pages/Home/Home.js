import React from "react";
import Button from "@material-ui/core/Button";
import { Link as NavLink } from "react-router-dom";

function Home() {
    return (
        <React.Fragment>
            <Button component={NavLink} to="/signin" variant="contained">
                login
            </Button>
            <Button component={NavLink} to="/signup" variant="contained">
                register
            </Button>
            <div>home</div>
        </React.Fragment>
    );
}

export default Home;
