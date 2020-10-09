import React, {Component} from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import {Button} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            accountId: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        try {
            const resp = await fetch("/login", {
                method: "POST",
                body: data
            });

            const resp_json = await resp.json();

            if (resp_json.message === "login successful") {
                console.log("successful login")
            }
        }
        catch (error) {
            console.log(error);
        }
        this.setState({
            password: "",
            accountId: ""
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    render() {
        return(
            <Paper style={{padding: 12}}>
                <form id="login-form" onSubmit={this.handleSubmit}>
                    <Grid container spacing={1} direction={"column"}>
                        <Grid item>
                            <TextField
                                id={"accountId"}
                                name={"accountId"}
                                value={this.state.accountId}
                                onChange={this.handleChange}
                                fullWidth={true}
                                label={"User Name"}
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                id={"password"}
                                name={"password"}
                                value={this.state.password}
                                onChange={this.handleChange}
                                fullWidth={true}
                                label={"Password"}
                                type={"password"}
                            />
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <Button variant={"contained"} type={"submit"}>
                                    Log In
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        );
    }
}

export default LoginForm;
