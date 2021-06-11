/*
With minor changes to lecture demonstration 'ReactJS - useContext & State
Management'.
*/

import PropTypes from 'prop-types';
import React from 'react';

export const StoreContext = React.createContext(null);

export default function StoreProvider ({ children }) {
  const [userToken, setUserToken] = React.useState(localStorage.getItem('token'));

  const store = {
    userToken: [userToken, setUserToken]
  }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

StoreProvider.propTypes = {
  children: PropTypes.object
};
