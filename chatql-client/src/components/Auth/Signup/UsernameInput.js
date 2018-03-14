import React from 'react';
import { Form } from 'semantic-ui-react';
import makeShakeAnimation from '../../../hoc/makeShakeAnimation';

const UsernameInput = (props) => {
  return (
    <div className={props.frameClass ? props.frameClass : ''}>
      <Form.Input
        error={props.userExists}
        loading={props.userLoading}
        fluid
        icon={props.usernameIcon}
        iconPosition='left'
        placeholder='Username'
        onChange={props.onChange}
      />
    </div>
  )
};

export default makeShakeAnimation(UsernameInput);
