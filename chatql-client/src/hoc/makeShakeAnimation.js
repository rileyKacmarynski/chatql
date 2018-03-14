import React, { Component } from 'react';
import { headShake } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headShake: {
    animationName: headShake,
    animationDuration: '1s'
  }
});

const makeShakeAnimation = (TargetComponent) => {
  return class extends Component {
    state = {
      startShake: this.props.userExists,
    }

    componentWillReceiveProps(nextProps){
      this.setState({ startShake: nextProps.userExists }, () => {
        const self = this;
        //need to reset the state after the animation has finished
        setTimeout(() => self.setState({startShake: false}), 2000);
      });    
    }
    
    render() {
      return (
        <TargetComponent {...this.props}
          frameClass={this.state.startShake ? css(styles.headShake) : ''} />
      )
    }
  }

}

export default makeShakeAnimation;
