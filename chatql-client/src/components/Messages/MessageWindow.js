import React from "react";
import { Segment } from "semantic-ui-react";

import DimLoader from "../../components/UI/DimLoader";
import Message from "../../components/Messages/Message";

const MessageWindow = props => {

  const messageContent = (props.loading || !props.messages)
    ? <DimLoader message={"Loading messages"} loading={props.loading} />
    : props.messages.map((m, index) => (
        <Message message={m} user={props.user} />
      ));

  return (
    <Segment
      secondary
      style={{
        height: "60vh",
        display: "flex",
        "flex-flow": "column"
      }}
    >
      {messageContent}
    </Segment>
  );
};

export default MessageWindow;
