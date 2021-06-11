import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom';

import api from '../util/Api';
import history from '../util/History';
import Question from '../classes/Question';
import defaultThumbnail from '../images/thumbnail-default.svg';
import * as S from '../styles/EditGame.styles';
import * as GS from '../styles/Global.styles';
import { StoreContext } from '../util/Store';

export default function EditGame ({ showPopup }) {
  const context = React.useContext(StoreContext);
  const [data, setData] = React.useState({ questions: [] });
  const [error, setError] = React.useState('');
  const { gameId } = useParams();
  const userToken = context.userToken[0];
  const [clientThumbnail, setClientThumbnail] = React.useState(null);
  const [clientThumbnailURL, setClientThumbnailURL] = React.useState('');
  const [thumbnailError, setThumbnailError] = React.useState('');
  const [gameName, setGameName] = React.useState('');
  const [editingName, setEditingName] = React.useState(false);

  // If user not authenticated, redirect to login page.
  if ((userToken === null) || (userToken === '')) {
    history.push('/login')
  }

  // initialise question data based on existing, then make api call.
  async function createQuestion () {
    await getData();
    const currentQuestions = [...data.questions];
    let curId = 0;
    for (let i = 0; i < currentQuestions.length; i++) {
      if (currentQuestions[i].id > curId) { curId = currentQuestions[i].id; }
    }
    const newQuestion = new Question(curId + 1);
    const newQuestions = [...currentQuestions, newQuestion];
    const payload = {
      questions: newQuestions
    }
    const response = await api.putAdminQuizQuizid(payload, gameId, userToken);
    const responseData = await response.json();
    if (response.status !== 200) {
      // TO-DO: Error pop-up for server error on PUT/admin/quiz/{quizid}.
      showPopup('Error: ' + responseData.error);
      //
    }
    getData();
  }

  // remove question with id === qId from current data, then make api call.
  async function deleteQuestion (qId) {
    await getData();
    // delete only question with specific id === qId
    const currentQuestions = [...data.questions];
    let deleteIndex = -1;
    for (let i = 0; i < currentQuestions.length; i++) {
      if (String(currentQuestions[i].id) === String(qId)) { deleteIndex = i; break; }
    }
    if (deleteIndex !== -1) { currentQuestions.splice(deleteIndex, 1); }
    const newQuestions = currentQuestions;
    const payload = {
      questions: newQuestions
    }
    const response = await api.putAdminQuizQuizid(payload, gameId, userToken);
    const responseData = await response.json();
    if (response.status !== 200) {
      // TO-DO: Error pop-up for server error on PUT/admin/quiz/{quizid}.
      console.log('Error:');
      console.log(responseData.error);
      //
    }
    getData();
  }

  // question list component. move later.
  function EditGameQuestion ({ qId, question }) {
    return (
      <S.EditGameQuestion>
        <p className='edit-game-question-name'>{question}</p>
        <div>
          <GS.BlueMediumButton onClick={() => { history.push('/editgame/' + gameId + '/' + qId); }}><i className='fas fa-pen'></i>Edit</GS.BlueMediumButton>
          <GS.RedMediumButton onClick={() => { deleteQuestion(qId) }}><i className='far fa-trash-alt'></i>Delete</GS.RedMediumButton>
        </div>
      </S.EditGameQuestion>
    )
  }

  function fileToDataURL (file) { // taken from assignment 2 helpers.
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const valid = validFileTypes.find(type => type === file.type);

    if (!valid) {
      setThumbnailError('File provided was not a valid .png file.');
      return;
    }

    const reader = new FileReader();
    const dataURLPromise = new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataURLPromise;
  }

  EditGameQuestion.propTypes = {
    qId: PropTypes.number,
    question: PropTypes.string
  }

  // retrieve game data and update useState.
  async function getData () {
    const response = await api.getAdminQuizQuizid(gameId, userToken);
    const responseData = await response.json();
    if (response.status !== 200) {
      setError(responseData.error);
    } else {
      setData(responseData);
      setGameName(responseData.name);
    }
  }

  async function saveGameName () {
    if (gameName === '') {
      showPopup('Error: Name must not be blank');
      return;
    }
    const payload = {
      name: gameName
    }
    const response = await api.putAdminQuizQuizid(payload, gameId, userToken);
    const responseData = await response.json();
    if (response.status !== 200) {
      showPopup('Error: ' + responseData.error);
      return;
    }
    setEditingName(false);
    getData();
  }

  async function submitThumbnail (e) {
    e.preventDefault();

    if (clientThumbnail === null) {
      setThumbnailError('File provided was not a valid .png file.');
      return;
    }

    const imgURL = await fileToDataURL(clientThumbnail);

    const payload = {
      thumbnail: imgURL
    }
    const response = await api.putAdminQuizQuizid(payload, gameId, userToken);
    const responseData = await response.json();
    if (response.status !== 200) {
      showPopup('Error: ' + responseData.error);
      return;
    }
    setClientThumbnail(null);
    setClientThumbnailURL('');
    getData();
  }

  // run getData on first page load.
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <GS.PageWrapper>
      {error !== ''
        ? <>
            <GS.PageTitle>Error 404</GS.PageTitle>
            <p>{error}</p>
          </>
        : <>
            <GS.PageTitle>
              {editingName === false
                ? <>
                    <S.EditName className='fas fa-pen' onClick={() => { setEditingName(true); }}></S.EditName> {data.name}
                  </>
                : <>
                    <S.TitleForm>
                      <S.TitleInput type='text' onChange={(e) => { setGameName(e.target.value); }} value={gameName}></S.TitleInput>
                      <div>
                        <GS.GreenMediumButton onClick={saveGameName}>Save</GS.GreenMediumButton>
                        <GS.RedMediumButton onClick={() => { setEditingName(false); setGameName(data.name); }}>Cancel</GS.RedMediumButton>
                      </div>
                    </S.TitleForm>
                  </>
              }
            </GS.PageTitle>
            {data.thumbnail === null
              ? <S.GameThumbnail src={defaultThumbnail}></S.GameThumbnail>
              : <S.GameThumbnail src={data.thumbnail}></S.GameThumbnail>
            }
            <GS.MiniLink to='/dashboard'>Back To Dashboard</GS.MiniLink>
            <br/>
            <br/>
            <GS.HorizontalDiv/>
            <S.ThumbnailForm onSubmit={submitThumbnail}>
              {thumbnailError !== ''
                ? <GS.ErrorText>{thumbnailError}</GS.ErrorText>
                : null
              }
              <p>Upload new thumbnail:</p>
              <input type='file' accept='.png' onChange={(e) => { setClientThumbnail(e.target.files[0]); setClientThumbnailURL(URL.createObjectURL(e.target.files[0])); }} />
              {clientThumbnailURL !== ''
                ? <>
                    <img src={clientThumbnailURL}/>
                    <button type="submit">Submit File</button>
                  </>
                : null
              }
            </S.ThumbnailForm>
            <GS.HorizontalDiv/>
            <GS.SectionTitle>Questions</GS.SectionTitle>
            {data.questions.map(question => (
              <EditGameQuestion key={question.id} qId={Number(question.id)} question={question.question} />
            ))}
            <GS.LargeCreateButton className='create-question' onClick={createQuestion}><i className="fas fa-plus"></i> Create Question</GS.LargeCreateButton>
          </>
      }
    </GS.PageWrapper>
  );
}

EditGame.propTypes = {
  showPopup: PropTypes.func,
  qId: PropTypes.number,
  question: PropTypes.string
}
