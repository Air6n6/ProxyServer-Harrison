import React from 'react';
import { mount, shallow } from 'enzyme';
import Guests from '../src/guests';
import GuestDropdown from '../src/guestDropdown';

describe('Guest Selection Unit Tests', () => {
  test('it should render a dropdown menu for guest selection', () => {
    const wrapper = shallow(<GuestDropdown />);
    expect(wrapper.find('label').length).toBe(3);
  });

  test('it should render a dropdown menu when displayDropdown is set to true', () => {
    const wrapper = mount(<Guests displayDropdown={true} />);
    expect(wrapper.find('label').length).toBe(4);
  });

  test('it should call handleGuestClick once the minus/plus button is clicked', () => {
    const mockClickHandler = jest.fn();
    const wrapper = shallow(
      <GuestDropdown handleGuestClick={mockClickHandler} />
    );

    wrapper.find('button').forEach(node => {
      node.simulate('click');
      expect(mockClickHandler).toHaveBeenCalled();
    });
  });
});
