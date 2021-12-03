import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import Login from "./Login";
import Register from "./Register";
class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      LoginView: [],
      loginmessage: "",
      buttonLabel: "Register",
      // isLogin: true
      isLogin: false
    };
  }

  handleClick(event) {
    // console.log("event",event);
    var loginmessage;
    if (!this.state.isLogin) {
    //   var LoginView = [];
    //   LoginView.push(<Register parentContext={this} />);
    //   loginmessage = "Already registered.Go to Login";
    //   this.setState({
    //     LoginView: LoginView,
    //     loginmessage: loginmessage,
    //     buttonLabel: "Login",
    //     isLogin: false
    //   });
    // } else {
      var LoginView = [];
      LoginView.push(<Login parentContext={this} />);
      // loginmessage = "Not Registered yet.Go to registration";
      loginmessage = "";
      this.setState({
        LoginView: LoginView,
        loginmessage: loginmessage,
        buttonLabel: "Register",
        isLogin: true
      });
    }
  }
  componentWillMount() {
    var LoginView = [];
    LoginView.push(
      <Login parentContext={this} appContext={this.props.parentContext} />
    );
    // var loginmessage = "Not registered yet, Register Now";
    var loginmessage = "";
    this.setState({
      LoginView: LoginView,
      loginmessage: loginmessage
    });
  }
  render() {
    return (
      <div className="LoginView">
        {this.state.LoginView}
        <div>
          {this.state.loginmessage}
          <MuiThemeProvider>
            <div>
              {/* <RaisedButton
                label={this.state.buttonLabel}
                primary={true}
                style={style}
                onClick={(event) => this.handleClick(event)}
              /> */}
              //hide rigister mudule!!!
            </div>
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15
};
export default LoginView;
