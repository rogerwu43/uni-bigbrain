import PropTypes from 'prop-types';
import React from 'react';

import DashboardGamesListGame from './DashboardGamesListGame';
import api from '../util/Api';

export default function DashboardGamesList ({ createGameActive, showPopup, userToken }) {
  const [games, setGames] = React.useState([]);

  async function getGameList () {
    const response = await api.getAdminQuiz(userToken);
    const responseData = await response.json();
    if (response.status !== 200) {
      showPopup('Error: ' + responseData.error);
      return;
    }
    setGames(responseData.quizzes);
  }

  React.useEffect(() => {
    getGameList();
  }, [createGameActive]);

  return (
    <div>
      {games.map(game => (
        <DashboardGamesListGame getGameList={getGameList} id={game.id} key={game.id} userToken={userToken} showPopup={showPopup} />
      ))}
    </div>
  );
}

DashboardGamesList.propTypes = {
  createGameActive: PropTypes.bool,
  userToken: PropTypes.string,
  showPopup: PropTypes.func
}
