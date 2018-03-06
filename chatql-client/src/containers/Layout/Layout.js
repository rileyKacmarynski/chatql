import React, { Component } from 'react'

import MainMenu from '../../components/menu/menu';
import {AUTH_TOKEN} from '../../constants';
export class Layout extends Component {  
    state = {
        isAuthenticated: localStorage.getItem(AUTH_TOKEN) !== null
    }
    render() {    
        return (
            <div>
                <MainMenu 
                    isAuthenticated={this.state.isAuthenticated}
                />
                <main>
                   {this.props.children}
                </main>
            </div>
        )
    }
};

export default Layout;
