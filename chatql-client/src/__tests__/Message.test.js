import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Message from '../components/Messages/Message';
import OutgoingMessage from '../components/Messages/OutgoingMessage';
import IncomingMessage from '../components/Messages/IncomingMessage';

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

  it(`should render <OutgoingMessage /> if the user id on the message and user
    prop match`, () => {
      wrapper.setProps({ message: message, user: user });  
      expect(wrapper.find(OutgoingMessage).length).toEqual(1);
  });

  it(`should render <IncomingMessage /> if the user id on the message and user
    prop match`, () => {
      wrapper.setProps({ message: message, user: {username: 'differentUser', id: 'differentId'} });  
      expect(wrapper.find(IncomingMessage).length).toEqual(1);
  });
});