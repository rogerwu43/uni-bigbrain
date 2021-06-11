import PropTypes from 'prop-types';
import React from 'react';

import * as GS from '../styles/Global.styles';
import * as S from '../styles/Play.styles';
import api from '../util/Api';

function PlayQuestion ({ questionData, answersData, showPopup, pid }) {
  const answers = questionData.question.answers;
  const [selected, setSelected] = React.useState([]);
  const [timer, setTimer] = React.useState(0);
  const [questionEnds, setQuestionEnds] = React.useState(-1);

  async function updateSelected (id) {
    if (questionData.question.type === 'Single') {
      setSelected([id]);
      const response = await api.putPlayPlayeridAnswer(pid, [id])
      if (response.status !== 200) {
        const error = await response.json();
        showPopup('Error: ' + error.error);
      }
    } else {
      const newSelected = [...selected];
      if (newSelected.includes(id)) {
        const index = newSelected.indexOf(id);
        if (index > -1) {
          newSelected.splice(index, 1);
        }
      } else {
        newSelected.push(id);
      }
      setSelected(newSelected)
      const response = await api.putPlayPlayeridAnswer(pid, newSelected)
      if (response.status !== 200 && newSelected.length !== 0) {
        const error = await response.json();
        showPopup('Error: ' + error.error);
      }
    }
  }

  const children = answers.map((val) => {
    if (answersData.length === 0) {
      return (
        <S.AnswerOption key={val.id}>
          <p>{val.answer}</p>
          {selected.includes(val.id)
            ? <S.SelectedAnswer onClick={(e) => { updateSelected(val.id); }}>Selected!</S.SelectedAnswer>
            : <S.NotSelectedAnswer onClick={(e) => { updateSelected(val.id); }}>Not Selected</S.NotSelectedAnswer>
          }
        </S.AnswerOption>
      );
    } else {
      if (answersData.includes(val.id)) {
        return (
          <div key={val.id}>
            <p><b>{val.answer}</b> was correct.</p>
          </div>
        )
      } else {
        return (
          <div key={val.id}>
            <p><b>{val.answer}</b> was not correct.</p>
          </div>
        )
      }
    }
  });

  // Set remaining question time on page render.
  React.useEffect(() => {
    const questionStarted = Date.parse(questionData.question.isoTimeLastQuestionStarted);
    const questionEnds = questionStarted + (questionData.question.timeLimit) * 1000;
    setQuestionEnds(questionEnds);
    const timeLeft = Math.floor((questionEnds - Date.now()) / 1000);
    if (timeLeft > 0) {
      setTimer(timeLeft);
    }
  }, [questionData]);

  React.useEffect(() => {
    setSelected([])
  }, [questionData.question.id, answersData.length]);

  React.useEffect(() => {
    const timerInterval = timer > 0 && setInterval(() => {
      setTimer(Math.floor((questionEnds - Date.now()) / 1000));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, [timer]);

  return (
    <div>
      <S.Question>{questionData.question.question}</S.Question>
      <GS.HorizontalDiv/>
      <S.Media>
        {questionData.question.image !== ''
          ? <S.Image src={questionData.question.image}/>
          : null
        }
        {questionData.question.video !== ''
          ? <S.Video src={questionData.question.video}/>
          : null
        }
      </S.Media>
      {questionData.question.type === 'Single'
        ? <GS.SubSectionTitle>Select 1 Answer</GS.SubSectionTitle>
        : <GS.SubSectionTitle>Select Up To {questionData.question.answers.length} Answers</GS.SubSectionTitle>
      }
      <GS.HorizontalDiv/>
      {timer === 0
        ? <S.Timer>Time Out!</S.Timer>
        : <S.Timer>{timer}</S.Timer>
      }
      {children}
    </div>
  );
}

export default PlayQuestion;

PlayQuestion.propTypes = {
  pid: PropTypes.number,
  questionData: PropTypes.object,
  answersData: PropTypes.array,
  showPopup: PropTypes.func
}
