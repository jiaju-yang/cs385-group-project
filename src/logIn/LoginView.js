import React, { Component } from "react";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { AppBar, Button, TextField } from '@mui/material'
import { UserAttemptsToLogin } from "../event";
import PubSub from 'pubsub-js';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleClick(event) {
    PubSub.publish(UserAttemptsToLogin, { email: this.state.username, password: this.state.password })
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Login" />
            <TextField
              label="Username"
              type="username"
              onChange={(event) =>
                this.setState({ username: event.target.value })
              }
            />
            <br />
            <TextField
              label="Password"
              type="password"
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
            <br />
            <Button
              onClick={(event) => this.handleClick(event)}
            >Submit</Button>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default LoginView;
