import React from 'react';
import { useParams } from 'react-router-dom';

import ResultsCharts from '../components/ResultsCharts';
import ResultsTable from '../components/ResultsTable';
import * as GS from '../styles/Global.styles';
import api from '../util/Api';
import history from '../util/History';
import { StoreContext } from '../util/Store';

export default function Results () {
  const context = React.useContext(StoreContext);

  const { sessionId } = useParams();
  const userToken = context.userToken[0];
  const [error, setError] = React.useState('');
  const [quizName, setQuizName] = React.useState('');
  const [tableData, setTableData] = React.useState([]);
  const [chartData, setChartData] = React.useState([]);

  async function getData () {
    // Get all quiz data
    const quizResponse = await api.getAdminQuiz(userToken);
    const quizResponseData = await quizResponse.json();
    if (quizResponse.status !== 200) {
      setError(quizResponseData.error);
      return -1;
    }
    let quizid = -1;
    for (let i = 0; i < quizResponseData.quizzes.length; i++) {
      if (quizResponseData.quizzes[i].oldSessions.includes(Number(sessionId))) {
        quizid = quizResponseData.quizzes[i].id;
        break;
      }
    }

    if (quizid === -1) {
      setError('quiz not found');
      return -1;
    }

    // Get actual quiz
    const response = await api.getAdminQuizQuizid(quizid, userToken);
    const responseData = await response.json();
    if (response.status !== 200) {
      setError(responseData.error);
      return -1;
    }
    setQuizName(responseData.name);

    // Get answers
    const answerResponse = await api.getAdminSessionSessionidResults(sessionId, userToken);
    const answerResponseData = await answerResponse.json();
    if (answerResponse.status !== 200) {
      setError(answerResponseData.error);
      return -1;
    }

    const questions = responseData.questions;
    const answers = answerResponseData.results;
    const userPoints = getPoints(answers, questions);
    userPoints.sort((a, b) => a.points < b.points ? 1 : a.points > b.points ? -1 : 0);
    setTableData(userPoints.slice(0, 5));
    // make table with this

    const questionStats = getQuestionStats(answers, questions);
    setChartData(questionStats);
  }

  function getPoints (users, questions) {
    const userPoints = users.map((user) => {
      let totalPoints = 0;
      for (let i = 0; i < user.answers.length; i++) {
        const questionValue = questions[i].points;
        const timeLimit = questions[i].timeLimit;
        if (user.answers[i].correct) {
          const timeAnswered = new Date(user.answers[i].answeredAt);
          const timeStarted = new Date(user.answers[i].questionStartedAt);
          totalPoints += calculatePoints(timeStarted, timeAnswered, timeLimit, questionValue);
        }
      }
      return ({
        name: user.name,
        points: totalPoints
      });
    });
    return userPoints;
  }

  function getQuestionStats (answers, questions) {
    const questionStats = questions.map((question, i) => {
      let numCorrect = 0;
      let totalTime = 0;
      for (let j = 0; j < answers.length; j++) {
        if (answers[j].answers.length === 0) {
          continue;
        }
        if (answers[j].answers[i].correct) { numCorrect++; }
        const t1 = new Date(answers[j].answers[i].answeredAt);
        const t2 = new Date(answers[j].answers[i].questionStartedAt);
        const timeTaken = ((t1 - t2) / 1000);
        totalTime += timeTaken;
      }
      return ({
        question: i + 1,
        'Percentage Correct': numCorrect / questions.length * 100,
        'Average Time Taken': totalTime / questions.length
      });
    });
    return questionStats;
  }

  function calculatePoints (timeStarted, timeAnswered, timeLimit, questionValue) {
    const t1 = new Date(timeAnswered);
    const t2 = new Date(timeStarted);
    const timeTaken = ((t1 - t2) / 1000);
    return Math.floor(questionValue * (timeLimit - timeTaken) ** 1.5);
  }

  // run getData on first page load.
  React.useEffect(() => {
    // If user not authenticated, redirect to login page.
    if ((userToken === null) || (userToken === '')) {
      history.push('/login')
    }
    getData();
  }, []);

  return (
    <GS.PageWrapper>
      {error !== ''
        ? <>{error}</>
        : <>
            <p><GS.MiniLink to='/dashboard'>Back To Dashboard</GS.MiniLink></p>
            <GS.PageTitle>Results</GS.PageTitle>
            <GS.SectionTitle>{quizName}</GS.SectionTitle>
            <br/>
            <ResultsTable data={tableData} />
            <br/>
            <br/>
            <ResultsCharts data={chartData} />
          </>
        }
    </GS.PageWrapper>
  );
}
