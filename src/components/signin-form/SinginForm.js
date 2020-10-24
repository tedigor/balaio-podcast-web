import React, { useContext, useState } from 'react'

import './SinginForm.scss';

import FormInput from '../../shared/components/form-input/FormInput';
import CustomButton from '../../shared/components/custom-button/CustomButton';

import SecurityContext from '../../contexts/SecurityContext';

const SinginForm = (props) => {

  const [signinForm, setSigninForm] = useState({ name: '', username: '', password: '', confirmPassword: '' });

  const { signin } = useContext(SecurityContext);

  const hadleSubmit = event => {
    event.preventDefault();
    if (signinForm.password === signinForm.confirmPassword) {
      signin(signinForm).then(console.log);
    }
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setSigninForm({ ...signinForm, [name]: value });
  }

  return (
    <div className="signin-container">
      <div className="title">
        <h3>Cadastre-se</h3>
      </div>
      <form className="signin-form" onSubmit={hadleSubmit}>

        <FormInput
          name="name"
          type="text"
          value={signinForm.name}
          required
          label="Nome"
          placeholder="Digite o seu nome"
          handleChange={handleChange} />

        <FormInput
          name="username"
          type="text"
          value={signinForm.username}
          required
          label="Usuário"
          placeholder="Digite o seu Usuário"
          handleChange={handleChange} />

        <FormInput
          name="password"
          type="password"
          value={signinForm.password}
          required
          label="Senha"
          placeholder="Senha"
          handleChange={handleChange} />

        <FormInput
          name="confirmPassword"
          type="password"
          value={signinForm.confirmPassword}
          required
          label="Confirmar Senha"
          placeholder="Confirmar Senha"
          handleChange={handleChange} />

        <CustomButton
          type="submit"
          value="Submit Form"
          color="primary"
          variant="contained">
          Cadastrar
        </CustomButton>

      </form>
    </div>
  );
}

export default SinginForm;