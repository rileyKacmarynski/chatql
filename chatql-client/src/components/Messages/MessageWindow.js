import React, { Component } from "react";
import { Segment } from "semantic-ui-react";

import DimLoader from "../../components/UI/DimLoader";
import Message from "../../components/Messages/Message";

class MessageWindow extends Component {
  componentDidMount(){
    this.scrollToBottom();
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  scrollToBottom(){
    this.el.scrollIntoView({ behavior: 'smooth'});
  }

  render() {
    let messageContent;
    if (this.props.loading) {
      messageContent = (
        <DimLoader message={"Loading messages"} loading={this.props.loading} />
      );
    } else {
      messageContent = this.props.messages
        ? this.props.messages.map((m, index) => (
            <Message key={m.id} message={m} user={this.props.user} />
          ))
        : "No messages available";
    }

    return (
      <Segment
        secondary
        style={{
          overflow: "auto",
          height: "60vh",
          display: "block",
          marginBottom: "10px"
        }}
      >
        {messageContent}
        <div ref={el => {this.el = el; }} />
      </Segment>
    );
  }
}

export default MessageWindow;
