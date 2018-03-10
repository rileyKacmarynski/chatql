import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SignupForm } from './signup-form';

configure({adapter: new Adapter});

describe('<SignupForm />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SignupForm />)
    });

    it("should not set icon to error if no error exists", () => {
        // wrapper.setState({error: false})
        // expect(wrapper.state.icon == 'remove').toBeFalsey();
    });
})
