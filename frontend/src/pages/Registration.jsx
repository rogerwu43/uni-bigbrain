import React from 'react';
import { Redirect } from 'react-router-dom';

import * as GS from '../styles/Global.styles';
import * as S from '../styles/LoginRegister.styles';
import api from '../util/Api';
import history from '../util/History';
import { StoreContext } from '../util/Store';

function RegistrationPage () {
  const context = React.useContext(StoreContext);
  const [userToken, setUserToken] = context.userToken;

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [registerError, setRegisterError] = React.useState('');

  if ((userToken !== '') && (userToken !== null)) {
    return <Redirect to='/dashboard' />
  }

  async function handleSubmit (event) {
    event.preventDefault();
    if (validateForm() === false) { return; }
    const response = await api.postAdminAuthRegister(email, password, name);
    const data = await response.json();
    if (response.status === 200) {
      registerSuccess(data.token);
    } else {
      setRegisterError(data.error);
    }
  }

  function registerSuccess (userToken) {
    localStorage.setItem('token', userToken);
    setUserToken(userToken);
    history.push('/dashboard');
  }

  function validateForm () {
    if (email === '') {
      setRegisterError("You haven't entered an email.");
      return false;
    } else if (name === '') {
      setRegisterError("You haven't entered a name.");
      return false;
    } else if (password === '') {
      setRegisterError("You haven't entered a password.");
      return false;
    }
    return true;
  }

  return (
    <GS.PageWrapper>
      <GS.PageTitle>Registration Page</GS.PageTitle>
      <S.LoginForm onSubmit={handleSubmit}>
          {registerError !== ''
            ? <GS.ErrorText className='form-error'>{registerError}</GS.ErrorText>
            : null
          }
          <S.LabelInput>
          <label>Email </label>
          <br/>
          <input className='email-input' type="text" onChange={(e) => setEmail(e.target.value)}/>
          </S.LabelInput>
          <S.LabelInput>
            <label>Name </label>
            <br/>
            <input className='name-input' type="text" onChange={(e) => setName(e.target.value)}/>
          </S.LabelInput>
          <S.LabelInput>
            <label>Password </label>
            <br/>
            <input className='password-input' type="password" onChange={(e) => setPassword(e.target.value)}/>
          </S.LabelInput>
          <button type="submit">Register</button>
          <br/>
          <GS.MiniLink to="/login">Login instead</GS.MiniLink>
      </S.LoginForm>
    </GS.PageWrapper>
  );
}

export default RegistrationPage;
