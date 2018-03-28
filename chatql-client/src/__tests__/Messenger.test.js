import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Messenger } from '../containers/Messenger/Messenger';
import MessageWindow from '../components/Messages/MessageWindow';
import MessageForm from '../containers/Messenger/MessageForm';
import MessageHeader from '../components/Messages/MessageHeader';

configure({ adapter: new Adapter()});


const user = {
  username: "test",
  id: "test",
}

const messages = [{
  content: "message content",
  id: "1",
  timestamp: new Date('1/1/2018'),
  sentBy: user
},
{
  content: "message content 2",
  id: "2",
  timestamp: new Date('1/1/2018'),
  sentBy: user
}]

describe('<Messenger />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Messenger getCurrentCredential={{ user }}
        messageQuery={{
          messages,
          loading: false
        }}
    />);
  });
  
  it('should render a <MessageWindow />', () => {
    expect(wrapper.find(MessageWindow).length).toEqual(1);
  });

  it('should render a <MessageForm />', () => {
    expect(wrapper.find(MessageForm).length).toEqual(1);
  });

  it('should render a <MessageHeader />', () => {
    expect(wrapper.find(MessageHeader).length).toEqual(1);
  });
});