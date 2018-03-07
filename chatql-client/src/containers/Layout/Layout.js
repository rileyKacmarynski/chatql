import React, { Component } from 'react'

import MainMenu from '../../components/menu/menu';
import {AUTH_TOKEN} from '../../constants';
import { getCurrentCredential } from '../../querys/auth-queries';

export class Layout extends Component {  
    render() {
        const { token } = this.props.getCurrentCredential;
        const isAuthenticated = token && token !== "";
        return (
            <div>
                <MainMenu isAuthenticated={isAuthenticated}/>
                <main>
                   {this.props.children}
                </main>
            </div>
        )
    }
};

export default getCurrentCredential(Layout);
