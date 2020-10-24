import React from "react";

import "./Login.scss";

import LoginForm from "../../../components/login-form/LoginForm";
import SigninForm from "../../../components/signin-form/SinginForm";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-form">
        <LoginForm />
      </div>
      <div className="divider"></div>
      <div className="signin-form">
        <SigninForm />
      </div>
    </div>
  );
};

export default Login;
