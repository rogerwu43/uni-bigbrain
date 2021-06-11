/*
With changes to original code found at:
  https://www.digitalocean.com/community/tutorials/react-modal-component
*/

import PropTypes from 'prop-types';
import React from 'react';

import api from '../util/Api';
import * as S from '../styles/CreateGameModal.styles';

export function CreateGameModal ({ createGameActive, hideCreateGame, userToken, showPopup }) {
  const [name, setName] = React.useState('');
  const [formError, setFormError] = React.useState('');
  const [clientFile, setClientFile] = React.useState(null);
  const [clientJSON, setClientJSON] = React.useState(null);
  const [clientJSONValid, setClientJSONValid] = React.useState(false);

  async function createGameFromJSON (e) {
    e.preventDefault();
    const json = JSON.parse(clientJSON);
    const createResponse = await api.postAdminQuizNew(json.name, userToken);
    if (createResponse.status !== 200) {
      const error = await createResponse.json();
      showPopup('Error: ' + error.error);
      return;
    }
    const gameID = await getNewestGame();
    const payload = {
      name: json.name,
      questions: json.questions
    }
    const updateResponse = await api.putAdminQuizQuizid(payload, gameID, userToken);
    if (updateResponse.status !== 200) {
      const error = await updateResponse.json();
      showPopup('Error: ' + error.error);
      return;
    }
    hideCreateGame();
  }

  async function getNewestGame () {
    const response = await api.getAdminQuiz(userToken);
    const responseData = await response.json();
    if (response.status !== 200) {
      showPopup('Error: ' + responseData.error);
      return;
    }
    let newestGameID = -1;
    let newestGameDate = -1;
    for (let i = 0; i < responseData.quizzes.length; i++) {
      if (Date.parse(responseData.quizzes[i].createdAt) > newestGameDate) {
        newestGameID = responseData.quizzes[i].id;
        newestGameDate = Date.parse(responseData.quizzes[i].createdAt);
      }
    }
    return newestGameID;
  }

  function readJSON (file) {
    const validFileTypes = ['application/json'];
    const valid = validFileTypes.find(type => type === file.type);

    if (!valid) {
      setClientJSONValid('Invalid file.');
      return false;
    }

    const reader = new FileReader();
    const dataTextPromise = new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsText(file);
    return dataTextPromise;
  }

  async function submitCreateForm (event) {
    event.preventDefault();

    if (formError !== '') {
      return;
    } else if (name === '') {
      setFormError('Please enter a game name.');
      return;
    }

    const response = await api.postAdminQuizNew(name, userToken);
    if (response.status !== 200) {
      const error = await response.json();
      showPopup('Error: ' + error.error);
      return;
    }

    hideCreateGame();
  }

  function validateJSON (json) {
    // Validate .name
    if (!('name' in json)) {
      setClientJSONValid("'name' not in JSON.");
      return false;
    } else {
      if (typeof json.name !== 'string') {
        setClientJSONValid("'name' is not a string.");
        return false;
      }
    }
    // Validate .questions
    if (!('questions' in json)) {
      setClientJSONValid("'questions' not in JSON.");
      return false;
    } else {
      if (!Array.isArray(json.questions)) {
        setClientJSONValid("'questions' is not an array.");
        return false;
      }
    }
    // validate .questions.answers
    for (let i = 0; i < json.questions.length; i++) {
      if (!('answers' in json.questions[i])) {
        setClientJSONValid("'answers' not in file 'questions'.");
        return false;
      } else {
        if (!Array.isArray(json.questions[i].answers)) {
          setClientJSONValid("'questions.answers' is not an array.");
          return false;
        } else {
          if (json.questions[i].answers.length < 2) {
            setClientJSONValid("'questions.answers' needs at least 2 answers.");
            return false;
          }
        }
      }
      for (let j = 0; j < json.questions[i].answers.length; j++) {
        if (!('answer' in json.questions[i].answers[j])) {
          setClientJSONValid("'answer' not in file 'questions.answers'.");
          return false;
        } else {
          if (typeof json.questions[i].answers[j].answer !== 'string') {
            setClientJSONValid("'questions.answer.answer' is not a string.");
            return false;
          }
        }
        if (!('id' in json.questions[i].answers[j])) {
          setClientJSONValid("'id' not in file 'questions.answers'.");
          return false;
        } else {
          if (!Number.isInteger(json.questions[i].answers[j].id)) {
            setClientJSONValid("'questions.answer.id' is not an integer.");
            return false;
          }
        }
        if (!('isCorrect' in json.questions[i].answers[j])) {
          setClientJSONValid("'isCorrect' not in file 'questions.answers'.");
          return false;
        } else {
          if (typeof json.questions[i].answers[j].isCorrect !== typeof true) {
            setClientJSONValid("'questions.answer.isCorrect' is not a bool.");
            return false;
          }
        }
      }
      if (!('id' in json.questions[i])) {
        setClientJSONValid("'id' not in file 'questions'.");
        return false;
      } else {
        if (!Number.isInteger(json.questions[i].id)) {
          setClientJSONValid("'questions.id' is not an integer.");
          return false;
        }
      }
      if (!('image' in json.questions[i])) {
        setClientJSONValid("'image' not in file 'questions'.");
        return false;
      } else {
        if (typeof json.questions[i].image !== 'string') {
          setClientJSONValid("'questions.image' is not a string.");
          return false;
        } else {
          // Validate string is an image.
          if (json.questions[i].image !== '') {
            const split = json.questions[i].image.split(',');
            if (split.length !== 2) {
              setClientJSONValid("'questions.image' does not have a valid URL.");
              return false;
            }
            if ((split[0] !== 'data:image/jpg;base64') && (split[0] !== 'data:image/png;base64')) {
              setClientJSONValid("'questions.image' does not provide a valid image type.");
              return false;
            }
          }
        }
      }
      if (!('points' in json.questions[i])) {
        setClientJSONValid("'points' not in file 'questions'.");
        return false;
      } else {
        if (!Number.isInteger(json.questions[i].points)) {
          setClientJSONValid("'questions.points' is not an integer.");
          return false;
        } else {
          if (![1, 2, 3, 4, 5].includes(json.questions[i].points)) {
            setClientJSONValid("'questions.points' is a non-valid number.");
            return false;
          }
        }
      }
      if (!('question' in json.questions[i])) {
        setClientJSONValid("'question' not in file 'questions'.");
        return false;
      } else {
        if (typeof json.questions[i].question !== 'string') {
          setClientJSONValid("'questions.question' is not a string.");
          return false;
        }
      }
      if (!('timeLimit' in json.questions[i])) {
        setClientJSONValid("'timeLimit' not in file 'questions'.");
        return false;
      } else {
        if (!Number.isInteger(json.questions[i].timeLimit)) {
          setClientJSONValid("'questions.timeLimit' is not an integer.");
          return false;
        } else {
          if (![5, 10, 20, 30, 60, 90, 120, 240].includes(json.questions[i].timeLimit)) {
            setClientJSONValid("'questions.timeLimit' is a non-valid number.");
            return false;
          }
        }
      }
      if (!('type' in json.questions[i])) {
        setClientJSONValid("'type' not in file 'questions'.");
        return false;
      } else {
        if (typeof json.questions[i].type !== 'string') {
          setClientJSONValid("'questions.type' is not a string.");
          return false;
        } else {
          if (json.questions[i].type === 'Single') {
            let correctCount = 0;
            for (let j = 0; j < json.questions[i].answers.length; j++) {
              if (json.questions[i].answers[j].isCorrect === true) {
                correctCount++;
              }
            }
            if (correctCount !== 1) {
              setClientJSONValid("'questions.type' does not match amount of correct answers.");
              return false;
            }
          } else if (json.questions[i].type === 'Multiple') {
            let correctCount = 0;
            for (let j = 0; j < json.questions[i].answers.length; j++) {
              if (json.questions[i].answers[j].isCorrect === true) {
                correctCount++;
              }
            }
            if (correctCount <= 1) {
              setClientJSONValid("'questions.type' does not match amount of correct answers.");
              return false;
            }
          } else {
            setClientJSONValid("'questions.type' is not a valid type.");
            return false;
          }
        }
      }
      if (!('video' in json.questions[i])) {
        setClientJSONValid("'video' not in file 'questions'.");
        return false;
      } else {
        if (typeof json.questions[i].video !== 'string') {
          setClientJSONValid("'questions.video' is not a string.");
          return false;
        } else {
          if ((!json.questions[i].video.includes('youtube.com')) && (json.questions[i].video !== '')) {
            setClientJSONValid("'questions.video' is not a valid youtube link.");
            return false;
          }
        }
      }
    }
    return true;
  }

  React.useEffect(() => {
    setName('');
  }, [createGameActive])

  React.useEffect(() => {
    if ((name.trim() === '') && (name !== '')) {
      setFormError('Please enter a game name.');
    } else {
      setFormError('');
    }
  }, [name])

  React.useEffect(async () => {
    if (clientFile !== null) {
      // Convert clientFile to JSON and setClientJSON.
      const fileText = await readJSON(clientFile);
      setClientJSON(fileText);
    } else {
      setClientJSONValid(false);
    }
  }, [clientFile]);

  React.useEffect(() => {
    // Validate clientJSON and clientJSONValid.
    if (clientJSON !== null) {
      try {
        JSON.parse(clientJSON);
        if (JSON.parse(clientJSON) === false) {
          throw new Error('not a .json file');
        }
      } catch (e) {
        setClientJSONValid('Invalid file.');
        return;
      }
      const json = JSON.parse(clientJSON);
      if (!validateJSON(json)) {
        return;
      }
      // to-do: validate json item attributes.
      setClientJSONValid('File is valid.');
    } else {
      setClientJSONValid(false);
    }
  }, [clientJSON]);

  return (
    <S.ModalBackground active={createGameActive}>
      <S.CreateGameModal active={createGameActive}>
        <h2>Create Game</h2>
        <form onSubmit={submitCreateForm}>
          <S.FormError>{formError}</S.FormError>
          <p>Enter name of the new game:</p>
          <input className='new-game-name-input' type='text' onChange={(e) => setName(e.target.value)} value={name}/>
          <button className='create-game-normal-button' type='submit'>Create Game</button>
          <p>Or import a .json game file (thumbnails and question media will not be retained):</p>
          <input type='file' accept='.json' onChange={(e) => { setClientFile(e.target.files[0]); }}></input>
          {clientFile !== null
            ? <>
                {clientJSONValid === 'File is valid.'
                  ? <>
                      <p>{clientJSONValid}</p>
                      <button type='submit' onClick={createGameFromJSON}>Create Game From File</button>
                    </>
                  : <>
                      <S.FormError>{clientJSONValid}</S.FormError>
                    </>
                }
              </>
            : null
          }
          <button type='button' onClick={hideCreateGame}>Cancel</button>
        </form>
      </S.CreateGameModal>
    </S.ModalBackground>
  );
}

CreateGameModal.propTypes = {
  createGameActive: PropTypes.bool,
  hideCreateGame: PropTypes.func,
  userToken: PropTypes.string,
  showPopup: PropTypes.func
}
