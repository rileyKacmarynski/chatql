import React from "react";
import { Label } from "semantic-ui-react";

import OutgoingMessage from "./OutgoingMessage";
import IncomingMessage from "./IncomingMessage";

const Message = props => {
  const Message =
    props.user && props.user.id !== props.message.sentBy.id
      ? IncomingMessage
      : OutgoingMessage;

  return (
    <Message timestamp={props.message.timestamp} id={props.message.id}>
      {props.message.content}
      <Label.Detail style={{ display: "block", marginLeft: "0" }}>
        {props.message.sentBy.username}
      </Label.Detail>
    </Message>
  );
};

export default Message;
