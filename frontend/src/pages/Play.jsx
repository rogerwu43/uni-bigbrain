import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import PlayQuestion from '../components/PlayQuestion';
import PlayLobby from '../components/PlayLobby';
import PlayResults from '../components/PlayResults';
import * as GS from '../styles/Global.styles';
import api from '../util/Api';
import history from '../util/History';

function PlayPage ({ showPopup }) {
  const [questionData, setQuestionData] = React.useState('');
  const [answersData, setAnswersData] = React.useState([]);
  const [resultsData, setResultsData] = React.useState('');
  const [body, setBody] = React.useState('lobby');
  const [questionPoints] = React.useState({});
  const [timeLimits] = React.useState({});

  const pid = history.location.state?.pid
  if (pid === undefined) {
    return <Redirect to='/join'/>
  }
  // poll
  async function getData () {
    const statusResponse = await api.getPlayPlayeridStatus(pid);
    if (statusResponse.status === 200) {
      const status = await statusResponse.json();
      // show question
      if (status.started === true) {
        const answersResponse = await api.getPlayPlayeridAnswer(pid);
        if (answersResponse.status === 200) {
          const answersData = await answersResponse.json();
          setAnswersData(answersData.answerIds);
        } else {
          setAnswersData([]);
        }
        const questionResponse = await api.getPlayPlayeridQuestion(pid);
        const questionData = await questionResponse.json();
        setQuestionData(questionData);
        questionPoints[questionData.question.id] = questionData.question.points;
        timeLimits[questionData.question.id] = questionData.question.timeLimit;
        setBody('question');
      // show lobby
      } else {
        setBody('lobby');
      }
      // change i think
      if (window.location.pathname === '/play') { setTimeout(getData, 2000); }
    } else {
      const error = await statusResponse.json();
      // show results if "Session ID is not an active session"
      const resultsResponse = await api.getPlayPlayeridResults(pid);
      if (resultsResponse.status === 200) {
        const resultsData = await resultsResponse.json();
        setResultsData(resultsData);
        setBody('results');
      } else {
        // actual error
        showPopup('Error: ' + error.error)
      }
    }
  }

  // stop polling on back
  window.onpopstate = () => {
    history.go();
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {body === 'lobby'
        ? <GS.PageWrapper background>
            <PlayLobby/>
          </GS.PageWrapper>
        : <GS.PageWrapper>
            {body === 'question'
              ? <PlayQuestion questionData = {questionData} answersData = {answersData} pid = {pid} showPopup={showPopup} />
              : null
            }
            {body === 'results'
              ? <PlayResults resultsData = {resultsData} pid = {pid} questionPoints = {questionPoints} timeLimits = {timeLimits} />
              : null
            }
          </GS.PageWrapper>
      }
    </>
  );
}

PlayPage.propTypes = {
  showPopup: PropTypes.func
}

export default PlayPage;
