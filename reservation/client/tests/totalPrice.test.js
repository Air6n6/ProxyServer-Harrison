import React from 'react';
import { shallow } from 'enzyme';
import TotalPrice from '../src/totalPrice';

describe('TotalPrice Unit Tests', () => {
  test('it should render a list of fees + price', () => {
    const wrapper = shallow(<TotalPrice />);

    expect(wrapper.find('section')).toExist();
  });

  test('it should not render cleaningFee if not greater than 0', () => {
    const wrapper = shallow(<TotalPrice cleaningFee={0} />);

    expect(wrapper.find('Cleaning Fee').length).toBe(0);
  });
});
