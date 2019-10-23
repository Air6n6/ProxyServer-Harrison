import React from 'react';
import moment from 'moment';
import { mount, shallow } from 'enzyme';
import Calendar from '../src/calendar';
import Dates from '../src/dates';

describe('Calendar Unit Tests', () => {
  test('it should render a calendar', () => {
    const wrapper = shallow(
      <Calendar cal={''} handleDateClick={() => {}} displayCal={() => {}} />
    );
    expect(wrapper.find('tbody')).toExist();
  });

  test('it should call handleClick once input box is clicked', () => {
    const mockClickHandler = jest.fn();
    const wrapper = shallow(<Dates displayCal={mockClickHandler} />);

    wrapper.find('input').map(node => node.simulate('click'));
    expect(mockClickHandler).toHaveBeenCalled();
  });

  test('it should call handleDateClick once date is clicked', () => {
    const mockClickHandler = jest.fn();
    const wrapper = mount(<Calendar handleDateClick={mockClickHandler} />);

    wrapper.instance().forceUpdate();
    wrapper.find({ day: 1 }).simulate('click');
    expect(mockClickHandler).toHaveBeenCalled();
  });

  test('it should call handleMonthClick when arrow is clicked', () => {
    const mockClickHandler = jest.fn();
    const wrapper = mount(<Calendar />);

    wrapper.instance().handleMonthClick = mockClickHandler;
    wrapper.instance().forceUpdate();
    wrapper.find('button').forEach(node => {
      node.simulate('click');
      expect(mockClickHandler).toHaveBeenCalled();
    });
  });

  test('it should update the month when arrow is clicked', () => {
    const wrapper = mount(<Calendar />);

    wrapper.instance().forceUpdate();
    wrapper.find('button').forEach(node => node.simulate('click'));
    expect(wrapper.instance().state.month.format('MMMM')).toBe(
      moment().format('MMMM')
    );
  });
});
