import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import MessageForm from '../containers/Messenger/MessageForm';

configure({adapter: new Adapter() });

describe('<MessageForm />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MessageForm />);
  });

  it('should be disabled if the user is not logged in', () => {

  });
  
})