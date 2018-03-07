import React, { Component } from 'react'

import MainMenu from '../../components/menu/menu';
import {AUTH_TOKEN} from '../../constants';
export class Layout extends Component {  
    render() {
        return (
            <div>
                <MainMenu />
                <main>
                   {this.props.children}
                </main>
            </div>
        )
    }
};

export default Layout;
