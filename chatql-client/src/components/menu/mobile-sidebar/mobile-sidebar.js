import React from "react";
import { Sidebar, Segment, Menu, Icon } from "semantic-ui-react";

import Container from "../../../hoc/container";

const MobileSidebar = props => {
  const authLinks = props.isAuthenticated ? (
    <Menu.Item onClick={() => props.goTo('/logout')} name="logout">
      <Icon name="sign out" color="pink" />
      Log-out
    </Menu.Item>
  ) : (
    <Container>
      <Menu.Item onClick={() => props.goTo('/login')} name="login">
        <Icon name="sign in" color="pink" />
        Log-in
      </Menu.Item>,
      <Menu.Item onClick={() => props.goTo('/signup')} name="signup">
        <Icon name="signup" color="pink" />
        Sign-up
      </Menu.Item>
    </Container>
  );

  return (
    <div>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation="push"
          width="thin"
          visible={props.visible}
          icon="labeled"
          vertical
          inverted
        >
          <Menu.Item onClick={() => props.goTo('/')} name="messages">
            <Icon name="mail outline" color="pink" />
            Messages
          </Menu.Item>
          {authLinks}
        </Sidebar>
        <Sidebar.Pusher>
          <Segment basic>{props.children}</Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

export default MobileSidebar;
