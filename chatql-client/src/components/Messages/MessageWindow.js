import React from "react";
import { Segment } from "semantic-ui-react";

import DimLoader from "../../components/UI/DimLoader";
import Message from "../../components/Messages/Message";

const MessageWindow = props => {

  let messageContent; 
  if(props.loading ){
    messageContent = <DimLoader message={"Loading messages"} loading={props.loading} />
  } else {
    messageContent = props.messages 
      ? props.messages.map((m, index) => (
          <Message message={m} user={props.user} />
        ))
      : 'No messages available';
  }
  

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
