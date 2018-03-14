import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MessageWindow from '../components/Messages/MessageWindow';
import DimLoader from '../components/UI/DimLoader';
import Message from '../components/Messages/Message';

configure({adapter: new Adapter()} );

const messages = []
messages.push({
  content: "message content",
  id: "1"
});

const user = {
  username: "test",
  id: "test",
}

describe('<MessageWindow />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MessageWindow />);
  });

  it('should render a loader if the message window is awaiting message results', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find(DimLoader)).toHaveLength(1);
  });
  it('should render a should render a message if one exists', () => {
    wrapper.setProps({ messages, user });
    expect(wrapper.find(Message)).toHaveLength(1);
  });
})