import React, { Component } from "react";
import { Container, Segment } from "semantic-ui-react";

import MessageHeader from "./MessageHeader";
import MessageWindow from "./MessageWindow";
import MessageFormWithData from "../../containers/Messenger/MessageFormWithData";

export class Messenger extends Component {
  componentDidMount() {}

  componentWillReceiveProps(newProps) {
    if(!newProps.loading){
      if(this.unsubscribe){
        this.unsubscribe();
      }
      this.unsubscribe = newProps.subscribeToNewMessages();
    }
  }

  render() {
    return (
      <Container text style={{ marginTop: "2em" }}>
        <MessageHeader />
        <Segment.Group big raised>
          <MessageWindow
            user={this.props.user}
            messages={this.props.data.messages}
            loading={this.props.loading}
          />
          <MessageFormWithData
            createMessage={this.props.submit}
            loading={this.props.loading}
            user={this.props.user}
          />
        </Segment.Group>
      </Container>
    );
  }
}

export default Messenger;
