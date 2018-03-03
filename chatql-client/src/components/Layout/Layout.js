import React, { Component } from 'react'

import MainMenu from '../Menu/Menu';

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
