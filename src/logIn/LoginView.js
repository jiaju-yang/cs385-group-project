import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import Login from "./Login";
import Register from "./Register";
class LoginView extends Component {
  
  handleClick(event) {
    // console.log("event",event);
    var isLogin=this.props.isLogin;
    if (!isLogin) {    
      <Login parentContext={this} />    
    }
  }
  
  render() {
    return (
      <div className="LoginView">
        {this.state.LoginView}
        <div>
          {this.state.loginmessage}
          <MuiThemeProvider>
            <div>        
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
