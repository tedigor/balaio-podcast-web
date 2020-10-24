import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";

import './LoginForm.scss';

import CustomButton from '../../shared/components/custom-button/CustomButton';
import FormInput from '../../shared/components/form-input/FormInput';

import SecurityContext from '../../contexts/SecurityContext';

const LoginForm = (props) => {

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const { login } = useContext(SecurityContext);
  const history = useHistory();

  const hadleSubmit = event => {
    event.preventDefault();
    login(loginForm).then(navigateToHome);
  }

  const navigateToHome = () => {
    history.push('/')
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  }

  return (
    <div className="login-container">
      <div className="title">
        <h3>Login</h3>
      </div>
      <form className="login-form" onSubmit={hadleSubmit}>
        <FormInput
          name="username"
          type="text"
          value={loginForm.username}
          required
          label="Usuário"
          placeholder="Digite o seu Usuário"
          handleChange={handleChange} />

        <FormInput
          name="password"
          type="password"
          value={loginForm.password}
          required
          label="Senha"
          placeholder="Senha"
          handleChange={handleChange} />

        <CustomButton
          type="submit"
          value="Submit Form"
          color="primary"
          variant="contained">
          Entrar
        </CustomButton>

      </form>
    </div>
  );
}

export default LoginForm;