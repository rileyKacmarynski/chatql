import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AuthMenu from './authMenu';
import { Menu } from 'semantic-ui-react';

configure({adapter: new Adapter()});

/**
 * @jest-environment node
 */

describe('<AuthMenu />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<AuthMenu />)        
    })
    
    it('should render the login and signup <NavLink />', () => {
        expect(wrapper.find(Menu.Item)).toHaveLength(2);
    });
    it('should render the logout <NavLink />', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(Menu.Item)).toHaveLength(1);
    });
});