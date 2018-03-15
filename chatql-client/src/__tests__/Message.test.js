import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Message from '../components/Messages/Message';
import OutgoingMessage from '../components/Messages/OutgoingMessage';

configure({adapter: new Adapter()} );



const user = {
  username: "test",
  id: "test",
}

const message = {
  content: "message content",
  id: "1",
  timestamp: new Date('1/1/2018'),
  sentBy: user
}

describe('<Message />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Message />);
  });

  it('should render to the DOM', () => {
    expect(wrapper.find(Message)).toBeDefined();
  });

  it('should render a message', () => {
    wrapper.setProps({ message: message, user: user });
    console.log(wrapper.find(Message));
   expect(wrapper.contains(<Message />)).toBeTruthy();
  });

  it(`should render <OutgoingMessage /> if the user id on the message and user
    prop match`, () => {
      expect(wrapper.find(OutgoingMessage)).toBeDefined();
    });

});