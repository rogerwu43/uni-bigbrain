import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import DashboardGamesListGame from './DashboardGamesListGame';
import * as S from '../styles/DashboardGamesListGame.styles';
import * as GS from '../styles/Global.styles';

describe('DashboardGamesListGame', () => {
  const noop = () => {};

  it('has a game title', () => {
    const test = mount(<DashboardGamesListGame
      getGameList={noop}
      id={0}
      userToken=''
      showPopup={noop}
    />);
    expect(test.find(S.Title)).toHaveLength(1);
  });

  it('has interaction buttons', () => {
    const test = mount(<DashboardGamesListGame
      getGameList={noop}
      id={0}
      userToken=''
      showPopup={noop}
    />);
    expect(test.find(GS.GreenMediumButton).first().text()).toBe('Start Game');
    expect(test.find(GS.BlueMediumButton).first().text()).toBe('Edit');
    expect(test.find(GS.RedMediumButton).first().text()).toBe('Delete');
    expect(test.find(GS.OrangeMediumButton).first().text()).toBe('Past results');
  });

  it('renders with minimal props (snapshot', () => {
    const test = renderer.create(<DashboardGamesListGame
                                    getGameList={noop}
                                    id={0}
                                    userToken=''
                                    showPopup={noop}
                                  />).toJSON()
    expect(test).toMatchSnapshot()
  });
});
