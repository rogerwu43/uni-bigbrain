import { mount } from 'enzyme'
import React from 'React'
import renderer from 'react-test-renderer'
import Popup from './Popup'

describe('Popup', () => {
  const noop = () => {};

  it('has a custom message', () => {
    const message = 'A custom message';
    const popup = mount(<Popup content={message} closeModal={noop}/>);
    expect(popup.find('p').text()).toBe(message);
  });

  it('uses the close function prop on button press', () => {
    const fn = jest.fn();
    const popup = mount(<Popup closeModal={fn}/>);
    popup.find('button').simulate('click');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('is visible with when the active prop is set to true', () => {
    const popup = mount(<Popup closeModal={noop} active={true} />);
    expect(popup.getDOMNode()).toHaveStyle('display: block');
  });

  it('is not visible with when the active prop is set to false', () => {
    const popup = mount(<Popup closeModal={noop} active={false} />);
    expect(popup.getDOMNode()).toHaveStyle('display: none');
  });

  // snapshots
  it('renders with minimal props (snapshot)', () => {
    const popup = renderer.create(<Popup closeModal={noop}/>).toJSON()
    expect(popup).toMatchSnapshot()
  });

  it('renders with custom text (snapshot)', () => {
    const popup = renderer.create(<Popup content = 'A custom message' closeModal={noop}/>).toJSON()
    expect(popup).toMatchSnapshot()
  });
});
