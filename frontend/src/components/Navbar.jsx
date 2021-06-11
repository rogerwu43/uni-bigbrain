import React from 'react';

import * as GS from '../styles/Global.styles';
import * as S from '../styles/Navbar.styles'
import api from '../util/Api';
import history from '../util/History';
import { StoreContext } from '../util/Store';

function Navbar () {
  const context = React.useContext(StoreContext);
  const [userToken, setUserToken] = context.userToken;

  async function logout () {
    const userToken = context.userToken[0];
    const response = await api.postAdminAuthLogout(userToken);
    if (response.status === 200) {
      logoutSuccess();
    } else {
      history.go();
    }
  }

  function logoutSuccess () {
    localStorage.setItem('token', '');
    setUserToken('');
    history.push('/login');
  }

  function siteClick () {
    if ((userToken === null) || (userToken === '')) {
      history.push('/login');
    } else {
      history.push('/dashboard');
    }
  }

  return (
    <S.Nav>
      <S.SiteLogo onClick={siteClick}>BigBrain <i className="fas fa-brain"></i></S.SiteLogo>
      <div>
        {(userToken === null) || (userToken === '')
          ? <GS.MediumButton onClick={() => { history.push('/login'); }}>Login</GS.MediumButton>
          : <>
              <GS.MediumButton onClick={logout}>Logout</GS.MediumButton>
            </>
        }
      </div>
    </S.Nav>
  );
}

export default Navbar;
