import { mount } from 'enzyme'
import React from 'React'
import renderer from 'react-test-renderer'
import LoginPage from './Login'
import { StoreContext } from '../util/Store';
import { Router } from 'react-router-dom';
import history from '../util/History';
import * as GS from '../styles/Global.styles';

describe('LoginPage', () => {
  const noToken = {
    userToken: [null, () => {}]
  }

  it('shows an error if the email field is left empty', () => {
    const login = mount(
      <Router history={history}>
        <StoreContext.Provider value={noToken}>
          <LoginPage/>
        </StoreContext.Provider>
      </Router>
    );
    const passwordInput = login.find('input').at(1);
    const loginButton = login.find('button');
    expect(login.find(GS.ErrorText)).toHaveLength(0);
    passwordInput.simulate('change', { target: { value: 'password' } })
    loginButton.simulate('submit');
    expect(login.find(GS.ErrorText).text()).toBe("You haven't entered an email.")
  });

  it('shows an error if the password field is left empty', () => {
    const login = mount(
      <Router history={history}>
        <StoreContext.Provider value={noToken}>
          <LoginPage/>
        </StoreContext.Provider>
      </Router>
    );
    const emailInput = login.find('input').at(0);
    const loginButton = login.find('button');
    expect(login.find(GS.ErrorText)).toHaveLength(0);
    emailInput.simulate('change', { target: { value: 'test@test.com' } })
    loginButton.simulate('submit');
    expect(login.find(GS.ErrorText).text()).toBe("You haven't entered a password.")
  });

  // snapshots
  it('renders correctly', () => {
    const login = renderer.create(
      <Router history={history}>
        <StoreContext.Provider value={noToken}>
          <LoginPage/>
        </StoreContext.Provider>
      </Router>
    ).toJSON()
    expect(login).toMatchSnapshot()
  });
});
