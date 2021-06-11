import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import Navbar from './Navbar';
import * as S from '../styles/Navbar.styles'
import { StoreContext } from '../util/Store';

describe('Navbar', () => {
  const noToken = {
    userToken: [null, () => {}]
  }

  const token = {
    userToken: 'token'
  }

  it('has a site logo', () => {
    const test = mount(
      <StoreContext.Provider value={noToken}>
        <Navbar/>
      </StoreContext.Provider>
    );
    expect(test.find(S.SiteLogo)).toHaveLength(1);
  });

  it('has a login button when no user token exists', () => {
    const test = mount(
      <StoreContext.Provider value={noToken}>
        <Navbar/>
      </StoreContext.Provider>
    );
    expect(test.find('button')).toHaveLength(1);
    expect(test.find('button').text()).toBe('Login');
  });

  it('has a logout button when a user token exists', () => {
    const test = mount(
      <StoreContext.Provider value={token}>
        <Navbar/>
      </StoreContext.Provider>
    );
    expect(test.find('button')).toHaveLength(1);
    expect(test.find('button').text()).toBe('Logout');
  });

  // snapshots
  it('renders correctly with no token (snapshot)', () => {
    const test = renderer.create(
      <StoreContext.Provider value={noToken}>
        <Navbar/>
      </StoreContext.Provider>
    ).toJSON();
    expect(test).toMatchSnapshot();
  });

  it('renders correctly with a token (snapshot)', () => {
    const test = renderer.create(
      <StoreContext.Provider value={token}>
        <Navbar/>
      </StoreContext.Provider>
    ).toJSON();
    expect(test).toMatchSnapshot();
  });
});
