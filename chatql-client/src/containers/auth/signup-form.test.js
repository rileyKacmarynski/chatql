import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from 'react-apollo/test-utils';
import { addTypenameToDocument } from 'apollo-client';

import { SignupForm } from './signup-form';
import { checkUsernameQuery } from '../../querys/auth-queries';

configure({adapter: new Adapter});

const userList = {
    users: [ { username: 'username' }]
}

describe('<SignupForm />', () => {
    let wrapper;
    beforeEach(() => { 
        wrapper = shallow(<SignupForm />);
    });

    it("should render without error", () => {
        expect(wrapper.find(SignupForm)).toBeDefined();
    });


    it('should change and check username on chanage', () => {
        const checkUsernameMock = jest.fn();
        wrapper.instance().checkUserName = checkUsernameMock;
        wrapper.update();
        
        const e = { target: { value: 'username' } };
        wrapper.instance().handleUserOnChange(e);

        expect(checkUsernameMock).toBeCalled();
        expect(wrapper.state().username).toEqual('username');
    });

    //not going to test password. I trust that react knows how to react

    it('should call handleSignup on submit', () => {
        //mock the event we pass to the submit function
        const eMock = { preventDefault: () => true};
        
        const submitMock = jest.fn((username, password) => { 
            return { data: { signup: true } };
        });

        //for some reason a jest.fn doen't do anything
        const historyMock = { push: (path) => true };

        wrapper.setProps({submit: submitMock, history: historyMock});
        wrapper.setState({ username: 'uesername', password: 'password'});
        
        wrapper.instance().handleSignup(eMock);

        expect(submitMock).toBeCalled();
    });
})
