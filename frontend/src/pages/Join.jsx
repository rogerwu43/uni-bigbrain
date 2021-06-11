import React from 'react';

import * as GS from '../styles/Global.styles';
import * as S from '../styles/LoginRegister.styles';
import api from '../util/Api';
import history from '../util/History';

function JoinPage () {
  const [name, setName] = React.useState('');
  const [joinError, setJoinError] = React.useState('');

  const search = window.location.search;
  const params = new URLSearchParams(search);
  let id = params.get('id');
  if (id === null) { id = ''; }
  const [sessionId, setSessionId] = React.useState(id);

  async function joinSession () {
    if (validateForm() === false) { return; }
    const response = await api.postPlayJoinSessionid(sessionId, name);
    const data = await response.json();
    if (response.status === 200) {
      joinSuccess(data.playerId);
    } else {
      setJoinError(data.error);
    }
  }

  function joinSuccess (playerId) {
    history.push('/play', { pid: playerId });
  }

  function validateForm () {
    if (sessionId === '') {
      setJoinError("You haven't entered a Session ID.");
      return false;
    } else if (name === '') {
      setJoinError("You haven't entered a name.");
      return false;
    }
    return true;
  }

  return (
    <GS.PageWrapper>
      <GS.PageTitle>Join Page</GS.PageTitle>
      <S.LoginDiv>
        {joinError !== ''
          ? <GS.ErrorText className='form-error'>{joinError}</GS.ErrorText>
          : null
        }
        <S.LabelInput>
          <label>Session ID</label>
          <br/>
          <input className='sessionid-input' value={sessionId} type="text" onChange={(e) => setSessionId(e.target.value)}/>
        </S.LabelInput>
        <S.LabelInput>
          <label>Name</label>
          <br/>
          <input className='name-input' onChange={(e) => setName(e.target.value)}/>
        </S.LabelInput>
        <button onClick={joinSession}>Join Game</button>
      </S.LoginDiv>
    </GS.PageWrapper>
  );
}

export default JoinPage;
