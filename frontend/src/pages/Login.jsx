import React from 'react';
import { Redirect } from 'react-router-dom';

import * as GS from '../styles/Global.styles';
import * as S from '../styles/LoginRegister.styles';
import api from '../util/Api';
import history from '../util/History';
import { StoreContext } from '../util/Store';

function LoginPage () {
  const context = React.useContext(StoreContext);
  const [userToken, setUserToken] = context.userToken;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');

  if ((userToken !== '') && (userToken !== null)) {
    return <Redirect to='/dashboard' />
  }

  async function handleSubmit (event) {
    event.preventDefault();
    if (validateForm() === false) { return; }
    const response = await api.postAdminAuthLogin(email, password);
    const data = await response.json();
    if (response.status === 200) {
      loginSuccess(data.token);
    } else {
      setLoginError(data.error);
    }
  }

  function loginSuccess (userToken) {
    localStorage.setItem('token', userToken);
    setUserToken(userToken);
    history.push('/dashboard');
  }

  function validateForm () {
    if (email === '') {
      setLoginError("You haven't entered an email.");
      return false;
    } else if (password === '') {
      setLoginError("You haven't entered a password.");
      return false;
    }
    return true;
  }

  return (
    <GS.PageWrapper>
      <GS.PageTitle>Login Page</GS.PageTitle>
      <S.LoginForm onSubmit={handleSubmit}>
          {loginError !== ''
            ? <GS.ErrorText className='form-error'>{loginError}</GS.ErrorText>
            : null
          }
          <S.LabelInput>
            <label>Email </label>
            <br/>
            <input className='email-input' type="text" onChange={(e) => setEmail(e.target.value)}/>
          </S.LabelInput>
          <S.LabelInput>
            <label>Password </label>
            <br/>
            <input className='password-input' type="password" onChange={(e) => setPassword(e.target.value)}/>
          </S.LabelInput>
          <button type="submit">Log In</button>
          <br/>
          <GS.MiniLink to='/register'>Register instead.</GS.MiniLink>
      </S.LoginForm>
    </GS.PageWrapper>
  );
}

export default LoginPage;
