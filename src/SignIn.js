import React, { useState } from "react";
import { UserAttemptsToLogin } from "./event";
import PubSub from 'pubsub-js';

const SignIn = () => {
  // we access authentication object from our
  // firebase database configuration.
  // our state variables for SignIn.
  // e for email, p for password
  const [inputFielde, setInputFielde] = useState("");
  const [inputFieldp, setInputFieldp] = useState("");

  // handler function when password textbox changes.
  const onChangePassword = (e) => {
    e.preventDefault();
    setInputFieldp(e.target.value);
  };

  // handler function when email textbox changes.
  const onChangeEmail = (e) => {
    e.preventDefault();
    setInputFielde(e.target.value);
  };

  return (
    <div>
      <h3>Customer Sign In</h3>
      <label htmlFor="email">Email</label>
      <br />
      <input
        onChange={onChangeEmail}
        value={inputFielde}
        type="email"
        id="email"
        name="email"
      />
      <br />
      <label htmlFor="password">password</label>
      <br />
      <input
        onChange={onChangePassword}
        value={inputFieldp}
        type="password"
        id="password"
        name="password"
      />
      <br />
      <br />
      <button onClick={() => {
        PubSub.publish(UserAttemptsToLogin, { email: inputFielde, password: inputFieldp })
      }}>Submit</button>
      <hr />
    </div>
  );
};

export default SignIn;
