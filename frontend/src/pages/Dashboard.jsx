import React from 'react';
// import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CreateGameModal } from '../components/CreateGameModal';
import DashboardGamesList from '../components/DashboardGamesList';
import * as GS from '../styles/Global.styles';
import history from '../util/History';
import { StoreContext } from '../util/Store';

function Dashboard ({ showPopup }) {
  const [createGameActive, setCreateGameActive] = React.useState(false);

  const context = React.useContext(StoreContext);
  const userToken = context.userToken[0];

  // If user not authenticated, redirect to login page.
  if ((userToken === null) || (userToken === '')) {
    // return <Redirect to='/login' />
    history.push('/login');
  }

  function hideCreateGame () {
    setCreateGameActive(false);
  }

  function showCreateGame () {
    setCreateGameActive(true);
  }

  return (
    <GS.PageWrapper>
      <GS.PageTitle>Dashboard</GS.PageTitle>
      <CreateGameModal createGameActive={createGameActive} hideCreateGame={hideCreateGame} showPopup={showPopup} userToken={userToken} />
      <GS.HorizontalDiv/>
      <DashboardGamesList createGameActive={createGameActive} userToken={userToken} showPopup={showPopup} />
      <GS.HorizontalDiv/>
      <GS.LargeCreateButton className='create-game-button' onClick={showCreateGame}><i className="fas fa-plus"></i> Create Game</GS.LargeCreateButton>
    </GS.PageWrapper>
  );
}

export default Dashboard;

Dashboard.propTypes = {
  showPopup: PropTypes.func
}
