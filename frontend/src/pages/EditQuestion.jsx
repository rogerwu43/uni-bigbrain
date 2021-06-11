// import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Answer from '../classes/Answer';
import Question from '../classes/Question';
import defaultThumbnail from '../images/thumbnail-default.svg';
import * as S from '../styles/EditQuestion.styles';
import api from '../util/Api';
import history from '../util/History';
import { StoreContext } from '../util/Store';

export default function EditQuestion ({ showPopup }) {
  const context = React.useContext(StoreContext);
  const { gameId, qId } = useParams();
  const [serverData, setServerData] = React.useState({ answers: {} });
  const userToken = context.userToken[0];
  // client-side input
  const [clientQuestionString, setClientQuestionString] = React.useState('');
  const [clientImage, setClientImage] = React.useState('');
  const [clientImagePreview, setClientImagePreview] = React.useState('');
  const [clientVideo, setClientVideo] = React.useState('');
  const [clientFormError, setClientFormError] = React.useState('');
  const [clientAnswer1, setClientAnswer1] = React.useState('');
  const [clientAnswer2, setClientAnswer2] = React.useState('');
  const [clientAnswer3, setClientAnswer3] = React.useState('');
  const [clientAnswer4, setClientAnswer4] = React.useState('');
  const [clientAnswer5, setClientAnswer5] = React.useState('');
  const [clientAnswer6, setClientAnswer6] = React.useState('');
  const [clientAnswer1Correct, setClientAnswer1Correct] = React.useState(false);
  const [clientAnswer2Correct, setClientAnswer2Correct] = React.useState(false);
  const [clientAnswer3Correct, setClientAnswer3Correct] = React.useState(false);
  const [clientAnswer4Correct, setClientAnswer4Correct] = React.useState(false);
  const [clientAnswer5Correct, setClientAnswer5Correct] = React.useState(false);
  const [clientAnswer6Correct, setClientAnswer6Correct] = React.useState(false);
  const [clientPoints, setClientPoints] = React.useState(0);
  const [clientQuestionType, setClientQuestionType] = React.useState('');
  const [clientTimeLimit, setClientTimeLimit] = React.useState(0)
  const [error, setError] = React.useState('');

  function fileToDataURL (file) { // taken from assignment 2 helpers.
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const valid = validFileTypes.find(type => type === file.type);

    if (!valid) {
      setClientFormError('Please ensure you have provided a valid .png file.');
      return false;
    }

    const reader = new FileReader();
    const dataURLPromise = new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataURLPromise;
  }

  // retrieve game data and update useState.
  async function getData () {
    const response = await api.getAdminQuizQuizid(gameId, userToken);
    const responseData = await response.json();
    if (response.status !== 200) {
      showPopup(responseData.error);
      return;
    }
    let found = false;
    for (let i = 0; i < responseData.questions.length; i++) {
      if (String(responseData.questions[i].id) === String(qId)) {
        found = true;
        setServerData(responseData.questions[i]);
        setClientQuestionString(responseData.questions[i].question);
        setClientImage(responseData.questions[i].image);
        setClientVideo(responseData.questions[i].video);
        // set initial client input values to server's.
        for (let j = 0; j < responseData.questions[i].answers.length; j++) {
          const serverAnswer = responseData.questions[i].answers[j];
          const serverAnswerId = String(serverAnswer.id);
          const serverAnswerString = serverAnswer.answer;
          const serverAnswerCorrect = serverAnswer.isCorrect;
          if (serverAnswerId === '1') {
            setClientAnswer1(serverAnswerString);
            setClientAnswer1Correct(serverAnswerCorrect);
          } else if (serverAnswerId === '2') {
            setClientAnswer2(serverAnswerString);
            setClientAnswer2Correct(serverAnswerCorrect);
          } else if (serverAnswerId === '3') {
            setClientAnswer3(serverAnswerString);
            setClientAnswer3Correct(serverAnswerCorrect);
          } else if (serverAnswerId === '4') {
            setClientAnswer4(serverAnswerString);
            setClientAnswer4Correct(serverAnswerCorrect);
          } else if (serverAnswerId === '5') {
            setClientAnswer5(serverAnswerString);
            setClientAnswer5Correct(serverAnswerCorrect);
          } else if (serverAnswerId === '6') {
            setClientAnswer6(serverAnswerString);
            setClientAnswer6Correct(serverAnswerCorrect);
          }
        }
        setClientPoints(responseData.questions[i].points);
        setClientQuestionType(responseData.questions[i].type);
        setClientTimeLimit(responseData.questions[i].timeLimit);
        break;
      }
    }
    // ERROR IF EDITING QUETSION THAT DOESNT EXIST
    if (found === false) {
      setError('question not found');
    }
  }

  async function sendUpdateQuestion (e) {
    e.preventDefault();
    // Check for errors.
    if (clientQuestionString === '') {
      setClientFormError("You haven't added a question.");
      return;
    }
    if (clientImagePreview !== '') {
      if (await fileToDataURL(clientImage) === false) {
        return;
      }
    }
    if (clientVideo !== '') {
      if (!clientVideo.includes('youtube.com')) {
        setClientFormError('The YouTube URL seems invalid.');
        return;
      }
    }
    if (clientAnswer1 === '') {
      setClientFormError("You haven't added Answer 1.");
      return;
    }
    if (clientAnswer2 === '') {
      setClientFormError("You haven't added Answer 2.");
      return;
    }
    let totalClientCorrect = 0;
    if (clientAnswer1Correct === true) {
      totalClientCorrect++;
    }
    if (clientAnswer2Correct === true) {
      totalClientCorrect++;
    }
    if (clientAnswer3Correct === true) {
      totalClientCorrect++;
    }
    if (clientAnswer4Correct === true) {
      totalClientCorrect++;
    }
    if (clientAnswer5Correct === true) {
      totalClientCorrect++;
    }
    if (clientAnswer6Correct === true) {
      totalClientCorrect++;
    }
    if ((clientQuestionType === 'Single') && (totalClientCorrect !== 1)) {
      setClientFormError('A Single-type question must have one correct answer.');
      return;
    } else if ((clientQuestionType === 'Multiple') && (totalClientCorrect <= 1)) {
      setClientFormError('A Multiple-type question must have at least two correct answers.');
      return;
    }
    // ok!
    setClientFormError('');
    setClientImagePreview('')
    // create question structure with new data.
    const updatedQuestion = new Question(qId);
    updatedQuestion.setQuestion(clientQuestionString);
    if (clientImagePreview !== '') {
      const updatedImageURL = await fileToDataURL(clientImage);
      updatedQuestion.setImage(updatedImageURL);
    } else {
      updatedQuestion.setImage(clientImage);
    }
    updatedQuestion.setVideo(clientVideo);
    const clientAnswers = [];
    if (clientAnswer1 !== '') {
      clientAnswers.push(new Answer(clientAnswer1, 1, clientAnswer1Correct));
    }
    if (clientAnswer2 !== '') {
      clientAnswers.push(new Answer(clientAnswer2, 2, clientAnswer2Correct));
    }
    if (clientAnswer3 !== '') {
      clientAnswers.push(new Answer(clientAnswer3, 3, clientAnswer3Correct));
    }
    if (clientAnswer4 !== '') {
      clientAnswers.push(new Answer(clientAnswer4, 4, clientAnswer4Correct));
    }
    if (clientAnswer5 !== '') {
      clientAnswers.push(new Answer(clientAnswer5, 5, clientAnswer5Correct));
    }
    if (clientAnswer6 !== '') {
      clientAnswers.push(new Answer(clientAnswer6, 6, clientAnswer6Correct));
    }
    updatedQuestion.setAnswers(clientAnswers);
    updatedQuestion.setPoints(clientPoints);
    updatedQuestion.setType(clientQuestionType);
    updatedQuestion.setTimeLimit(clientTimeLimit);
    // get current data from server again
    const response = await api.getAdminQuizQuizid(gameId, userToken);
    const responseData = await response.json();
    if (response.status !== 200) {
      showPopup(responseData.error);
      return;
    }
    const currentQuestions = [...responseData.questions];
    // let deleteIndex = -1;
    for (let i = 0; i < currentQuestions.length; i++) {
      if (String(currentQuestions[i].id) === String(qId)) {
        currentQuestions[i] = updatedQuestion;
        break;
      }
    }
    // remove old question with same qId
    // if (deleteIndex !== -1) { currentQuestions.splice(deleteIndex, 1); }
    const newQuestions = currentQuestions;
    // add new question data from current page and send for updating on server
    // newQuestions.push(updatedQuestion);
    const payload = {
      questions: newQuestions
    }
    const response2 = await api.putAdminQuizQuizid(payload, gameId, userToken);
    if (response2.status !== 200) {
      showPopup(responseData.error);
      return;
    }
    history.push('/editgame/' + gameId);
  }

  // run getData on first page load.
  React.useEffect(() => {
    // If user not authenticated, redirect to login page.
    if ((userToken === null) || (userToken === '')) {
      history.push('/login')
    }
    getData();
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [clientFormError])

  return (
    <>
      {error !== ''
        ? <>
            <h1>Error</h1>
            <p>{error}</p>
          </>
        : <S.EditQuestion onSubmit={sendUpdateQuestion}>
            <S.InputOptions>
              {clientFormError !== ''
                ? <S.FormError>{clientFormError}</S.FormError>
                : null
              }
              <S.SaveButton type='submit'><i className='fas fa-save'></i> Save Changes</S.SaveButton>
              <S.DiscardButton onClick={() => { history.push('/editgame/' + gameId) }} type='button'><i className='fas fa-door-open'></i> Exit</S.DiscardButton>
              <S.QuestionInput className='question-string' type='text' onChange={(e) => { setClientQuestionString(e.target.value); }} placeholder='Type a question ...' value={clientQuestionString} />
              <S.MediaOptions>
                <S.CurrentImage>
                  {clientImagePreview !== ''
                    ? <>
                        <img src={clientImagePreview} />
                        <button type='button' onClick={() => { setClientImage(''); setClientImagePreview(''); }}>Remove</button>
                        <button type='button' onClick={() => { setClientImage(serverData.image); setClientImagePreview(''); }}>Reset File Changes</button>
                      </>
                    : <>
                        {clientImage !== ''
                          ? <>
                              <img src={clientImage} />
                              <button type='button' onClick={() => { setClientImage(''); setClientImagePreview(''); }}>Remove</button>
                            </>
                          : <>
                              <img src={defaultThumbnail} />
                              <p>Add image</p>
                              <input type='file' id='files' accept='.png' onChange={(e) => { setClientImage(e.target.files[0]); setClientImagePreview(URL.createObjectURL(e.target.files[0])); }} />
                              {serverData.image !== ''
                                ? <button type='button' onClick={() => { setClientImage(serverData.image); setClientImagePreview(''); }}>Reset File Changes</button>
                                : null
                              }
                            </>
                        }
                      </>
                  }
                </S.CurrentImage>
                <S.CurrentVideo>
                  {((clientVideo !== '') && (clientVideo.includes('youtube.com')))
                    ? <>
                        <iframe src={clientVideo}></iframe>
                        <button type='button' onClick={() => { setClientVideo(''); }}>Remove</button>
                      </>
                    : <>
                        <img src={defaultThumbnail} />
                        <input className='video-string' type='text' onChange={(e) => { setClientVideo(e.target.value.replace('watch?v=', 'embed/')); }} placeholder='Enter a Youtube video URL (optional)' value={clientVideo} />
                      </>
                  }
                  {clientVideo !== serverData.video
                    ? <>
                        <button type='button' onClick={() => { setClientVideo(serverData.video); }}>Reset Video Changes</button>
                      </>
                    : null
                  }
                </S.CurrentVideo>
              </S.MediaOptions>
              <S.AnswerOptionList>
                <S.AnswerDiv>
                  <S.AnswerInput className='answer1-string' type='text' onChange={(e) => { setClientAnswer1(e.target.value); }} placeholder='Add answer 1 ...' value={clientAnswer1} />
                  {clientAnswer1 !== ''
                    ? <>
                        <input className='answer1-box' type='checkbox' checked={clientAnswer1Correct} onChange={(e) => { setClientAnswer1Correct(e.target.checked); }} />
                      </>
                    : null
                  }
                </S.AnswerDiv>
                <S.AnswerDiv>
                  <S.AnswerInput className='answer2-string' type='text' onChange={(e) => { setClientAnswer2(e.target.value); }} placeholder='Add answer 2 ...' value={clientAnswer2} />
                  {clientAnswer2 !== ''
                    ? <>
                        <input className='answer2-box' type='checkbox' checked={clientAnswer2Correct} onChange={(e) => { setClientAnswer2Correct(e.target.checked); }} />
                      </>
                    : null
                  }
                </S.AnswerDiv>
                <S.AnswerDiv>
                  <S.AnswerInput className='answer3-string' type='text' onChange={(e) => { setClientAnswer3(e.target.value); }} placeholder='Add answer 3 ... (optional)' value={clientAnswer3} />
                  {clientAnswer3 !== ''
                    ? <>
                        <input className='answer3-box' type='checkbox' checked={clientAnswer3Correct} onChange={(e) => { setClientAnswer3Correct(e.target.checked); }} />
                      </>
                    : null
                  }
                </S.AnswerDiv>
                <S.AnswerDiv>
                  <S.AnswerInput className='answer4-string' type='text' onChange={(e) => { setClientAnswer4(e.target.value); }} placeholder='Add answer 4 ... (optional)' value={clientAnswer4} />
                  {clientAnswer4 !== ''
                    ? <>
                        <input className='answer4-box' type='checkbox' checked={clientAnswer4Correct} onChange={(e) => { setClientAnswer4Correct(e.target.checked); }} />
                      </>
                    : null
                  }
                </S.AnswerDiv>
                <S.AnswerDiv>
                  <S.AnswerInput className='answer5-string' type='text' onChange={(e) => { setClientAnswer5(e.target.value); }} placeholder='Add answer 5 ... (optional)' value={clientAnswer5} />
                  {clientAnswer5 !== ''
                    ? <>
                        <input className='answer5-box' type='checkbox' checked={clientAnswer5Correct} onChange={(e) => { setClientAnswer5Correct(e.target.checked); }} />
                      </>
                    : null
                  }
                </S.AnswerDiv>
                <S.AnswerDiv>
                  <S.AnswerInput className='answer6-string' type='text' onChange={(e) => { setClientAnswer6(e.target.value); }} placeholder='Add answer 6 ... (optional)' value={clientAnswer6} />
                  {clientAnswer6 !== ''
                    ? <>
                        <input className='answer6-box' type='checkbox' checked={clientAnswer6Correct} onChange={(e) => { setClientAnswer6Correct(e.target.checked); }} />
                      </>
                    : null
                  }
                </S.AnswerDiv>
              </S.AnswerOptionList>
            </S.InputOptions>
            <S.StatOptions>
              <p><i className='far fa-comment-dots'></i> Question Type</p>
              <S.Select className='question-type' name='questionType' onChange={(e) => { setClientQuestionType(e.target.value) }} value={clientQuestionType}>
                <option value='Single'>Single</option>
                <option value='Multiple'>Multiple</option>
              </S.Select>
              <p><i className='fas fa-clock'></i> Time Limit</p>
              <S.Select className='question-time' name='timeLimit' onChange={(e) => { setClientTimeLimit(e.target.value); }} value={clientTimeLimit}>
                <option value='5'>5 seconds</option>
                <option value='10'>10 seconds</option>
                <option value='20'>20 seconds</option>
                <option value='30'>30 seconds</option>
                <option value='60'>1 minute</option>
                <option value='90'>1 minute 30 seconds</option>
                <option value='120'>2 minutes</option>
                <option value='240'>4 minutes</option>
              </S.Select>
              <p><i className='fas fa-medal'></i> Base Point Value</p>
              <S.Select className='question-points' name='points' onChange={(e) => { setClientPoints(e.target.value); }} value={clientPoints}>
                <option value='1'>1 point</option>
                <option value='2'>2 points</option>
                <option value='3'>3 points</option>
                <option value='4'>4 points</option>
                <option value='5'>5 points</option>
              </S.Select>
              <S.SaveButton type='submit'><i className='fas fa-save'></i> Save Changes</S.SaveButton>
            </S.StatOptions>
          </S.EditQuestion>
      }
    </>
  );
}

EditQuestion.propTypes = {
  showPopup: PropTypes.func
}
