import MainMenu from "../common/MainMenu";
import React from "react";
import {Component} from "react";
import LoginForm from "../common/LoginForm";
import {Grid} from "@material-ui/core";


class LandingPage extends Component {
    render() {
        return (
            <div>
                <MainMenu />
                <Grid
                    container
                    justify={"center"}
                    alignItems={"center"}
                    spacing={3}
                    style={{minHeight: 500}}
                >
                    <Grid item xs={3}>
                        <LoginForm />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default LandingPage;