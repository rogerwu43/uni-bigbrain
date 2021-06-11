import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import './App.css';

import Navbar from './components/Navbar';

import LoginPage from './pages/Login';
import RegistrationPage from './pages/Registration';
import JoinPage from './pages/Join';
import Dashboard from './pages/Dashboard';
import EditGame from './pages/EditGame';
import EditQuestion from './pages/EditQuestion';
import Results from './pages/Results';
import PlayPage from './pages/Play';
import Popup from './components/Popup'

function App () {
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [popupContent, setPopupContent] = React.useState('');

  function showPopup (msg) {
    console.log('hi');
    setPopupContent(msg);
    setPopupVisible(true);
  }

  function closePopup (msg) {
    setPopupVisible(false);
  }

  return (
    <>
      <Navbar/>
      <Switch>
      <Route exact path="/login">
        <LoginPage/>
      </Route>
      <Route exact path="/register">
        <RegistrationPage/>
      </Route>
      <Route exact path="/dashboard">
        <Dashboard showPopup={showPopup}/>
      </Route>
      <Route exact path="/join">
        <JoinPage/>
      </Route>
      <Route exact path="/">
        <Redirect to="/login"/>
      </Route>
      <Route exact path="/editgame/:gameId">
        <EditGame showPopup={showPopup}/>
      </Route>
      <Route exact path="/editgame/:gameId/:qId">
        <EditQuestion/>
      </Route>
      <Route exact path="/results/:sessionId">
        <Results/>
      </Route>
      <Route exact path="/play">
        <PlayPage showPopup={showPopup}/>
      </Route>
      <Route path="/game">
        game
      </Route>
      <Route path="/">
        Page not found
      </Route>
    </Switch>
      <Popup content={popupContent} active={popupVisible} closeModal={closePopup}/>
    </>
  );
}

export default App;
