import PropTypes from 'prop-types';
import React from 'react';

import * as GS from '../styles/Global.styles';
// import * as S from '../styles/Play.styles';
// import api from '../util/Api';

function PlayResults ({ resultsData, questionPoints, timeLimits }) {
  console.log(questionPoints);
  console.log(timeLimits);
  let totalPoints = 0;
  const children = resultsData.map((val, i) => {
    if (val.correct) {
      totalPoints += calculatePoints(val.questionStartedAt, val.answeredAt, timeLimits[i + 1], questionPoints[i + 1])
    }
    return (
      <div key={i + 1}>
        {val.correct
          ? <p><b>Q{i + 1}.</b> Correct</p>
          : <p><b>Q{i + 1}.</b> Incorrect</p>
        }
      </div>
    )
  });

  function calculatePoints (timeStarted, timeAnswered, timeLimit, questionValue) {
    const t1 = new Date(timeAnswered);
    const t2 = new Date(timeStarted);
    const timeTaken = ((t1 - t2) / 1000);
    return Math.floor(questionValue * (timeLimit - timeTaken) ** 1.5);
  }

  return (
    <div>
      <GS.PageTitle>Game Finished</GS.PageTitle>
      <GS.SectionTitle>Your Results</GS.SectionTitle>
      {children}
      <br/>
      <GS.SubText>
        Points are calculated by Base_Points x Time_Left^1.5
        <br/>
        (points are worth more the sooner you pick your answer!)
      </GS.SubText>
      <p>Total points: {totalPoints}</p>
    </div>
  );
}

export default PlayResults;

PlayResults.propTypes = {
  resultsData: PropTypes.array,
  questionPoints: PropTypes.object,
  timeLimits: PropTypes.object
}
