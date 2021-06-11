import PropTypes from 'prop-types';
import React from 'react';

import defaultThumbnail from '../images/thumbnail-default.svg';
import * as S from '../styles/DashboardGamesListGame.styles';
import * as GS from '../styles/Global.styles';
import api from '../util/Api';
import history from '../util/History';
import ResultsModal from './ResultsModal'
import Confirmation from './Confirmation'

export default function DashboardGamesListGame ({ getGameList, id, showPopup, userToken }) {
  const [data, setData] = React.useState({ active: null, questions: [] });
  const [status, setStatus] = React.useState({ position: -1, questions: [], players: [] });
  const [pastResults, setPastResults] = React.useState([]);
  const [showPastResultsModal, setShowPastResultsModal] = React.useState(false);
  const [lastSessionId, setLastSessionId] = React.useState(0);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [timer, setTimer] = React.useState(0);
  const [questionEnds, setQuestionEnds] = React.useState(-1);

  async function deleteGame () {
    const response = await api.deleteAdminQuizQuizid(id, userToken);
    if (response.status !== 200) {
      const error = await response.json();
      showPopup('Error: ' + error.error);
    }
    getGameList();
  }

  async function startGame () {
    const response = await api.postAdminQuizQuizidStart(id, userToken);
    if (response.status !== 200) {
      const error = await response.json();
      showPopup('Error: ' + error.error);
    }
    getData();
  }

  async function advanceGame () {
    const response = await api.postAdminQuizQuizidAdvance(id, userToken);
    if (response.status !== 200) {
      const error = await response.json();
      showPopup('Error: ' + error.error);
    }
    if (status.position === data.questions.length - 1) {
      setLastSessionId(data.active);
      setShowConfirmation(true);
    }
    getData();
  }

  async function endGame () {
    const response = await api.postAdminQuizQuizidEnd(id, userToken);
    if (response.status !== 200) {
      const error = await response.json();
      showPopup('Error: ' + error.error);
    } else {
      setLastSessionId(data.active);
      setShowConfirmation(true);
    }
    getData();
  }

  function showLastResult () {
    history.push('/results/' + lastSessionId);
  }

  function closeConfirmation () {
    setShowConfirmation(false);
  }

  function showPastSessions () {
    setPastResults(data.oldSessions);
    setShowPastResultsModal(true);
  }

  function closeModal () {
    setShowPastResultsModal(false);
  }

  async function getData () {
    const response = await api.getAdminQuizQuizid(id, userToken);
    const responseData = await response.json();
    if (response.status !== 200) {
      showPopup('Error: ' + responseData.error);
    }
    if (responseData.active !== null) {
      const statusResponse = await api.getAdminSessionSessionidStatus(responseData.active, userToken);
      const statusResponseData = await statusResponse.json();
      if (statusResponse.status !== 200) {
        const error = statusResponseData;
        showPopup('Error: ' + error.error);
      }
      setStatus(statusResponseData.results);
      if (statusResponseData.results.position > -1) {
        const questionStarted = Date.parse(statusResponseData.results.isoTimeLastQuestionStarted);
        const questionEnds = questionStarted + (statusResponseData.results.questions[statusResponseData.results.position].timeLimit) * 1000;
        setQuestionEnds(questionEnds);
        const timeLeft = Math.floor((questionEnds - Date.now()) / 1000);
        if (timeLeft > 0) {
          setTimer(timeLeft);
        }
      }
    }
    setData(responseData);
  }

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    const timerInterval = timer > 0 && setInterval(() => {
      setTimer(Math.floor((questionEnds - Date.now()) / 1000));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timer]);

  function editGame () {
    history.push('/editgame/' + id);
  }

  return (
    <S.DashboardGamesListGame>
      <S.Details>
        {data.thumbnail
          ? <>
              <S.Thumbnail img={data.thumbnail}>
              {data.active
                ? <>
                    <p className='sessionid-give'>
                      Session ID
                      <br></br>
                      <b>{data.active}</b>
                    </p>
                  </>
                : null
              }
              </S.Thumbnail>
            </>
          : <S.DefaultThumbnail img={defaultThumbnail}>
              {data.active
                ? <>
                    <p className='sessionid-give'>
                      Session ID
                      <br></br>
                      <b>{data.active}</b>
                    </p>
                  </>
                : null
              }
            </S.DefaultThumbnail>
        }
        <S.Data>
          <S.Title>
            <p className='dashboard-game-title'>{data.name}</p>
          </S.Title>
          <S.SubDetails>
            <p><b>Questions:</b> {data.questions.length}</p>
            <p><b>Total Time:</b> {data.questions.reduce((totalTime, datum) => totalTime + Number(datum.timeLimit), 0)}</p>
          </S.SubDetails>
        </S.Data>
      </S.Details>
      <S.Options>
        {data.active
          ? <>
              {status.position <= -1
                ? <GS.GreenMediumButton type='button' onClick={advanceGame}>Advance (Currently In: Lobby)</GS.GreenMediumButton>
                : <>
                    {timer > 0
                      ? <GS.DarkGreenMediumButton type='button' onClick={advanceGame} disabled>Q{status.position + 1}, {timer}s left</GS.DarkGreenMediumButton>
                      : <GS.GreenMediumButton type='button' onClick={advanceGame}>Advance (Q{status.position + 1}, time out)</GS.GreenMediumButton>
                    }
                  </>
              }
              <GS.BlueMediumButton type='button' onClick={() => { navigator.clipboard.writeText(location.host + '/join?id=' + data.active) }}><i className='fas fa-clipboard-list'></i> Copy Link</GS.BlueMediumButton>
              <GS.RedMediumButton type='button' onClick={endGame}>End</GS.RedMediumButton>
            </>
          : <>
              <GS.GreenMediumButton type='button' onClick={startGame}>Start Game</GS.GreenMediumButton>
              <GS.BlueMediumButton type='button' className='dashboard-game-edit' onClick={editGame}><i className='fas fa-pen'></i>Edit</GS.BlueMediumButton>
              <GS.RedMediumButton type='button' onClick={deleteGame}><i className='far fa-trash-alt'></i>Delete</GS.RedMediumButton>
              <GS.OrangeMediumButton type='button' onClick={showPastSessions}>Past results</GS.OrangeMediumButton>
            </>
        }
      </S.Options>
      <ResultsModal content={pastResults} active={showPastResultsModal} closeModal={closeModal} />
      <Confirmation content="Would you like to view the results for the quiz?" active={showConfirmation} closeModal={closeConfirmation} onConfirm = {showLastResult} />
    </S.DashboardGamesListGame>
  )
}

DashboardGamesListGame.propTypes = {
  getGameList: PropTypes.func,
  id: PropTypes.number,
  userToken: PropTypes.string,
  showPopup: PropTypes.func
}
