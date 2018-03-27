import React from "react";
import { Label } from "semantic-ui-react";

import MessageTimestamp from "./MessageTimestamp";

const IncomingMessage = props => {
  return (
    <div
      key={props.id}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        maxWidth: "70%",
        marginRight: "30%",
        marginBottom: "10px",
        borderRadius: "10px",
        flexWrap: "wrap"
      }}
    >
      <div>
        <Label
          pointing="left"
          color="white"
          style={{ margin: "0", lineHeight: "1.2", display: 'block' }}
        >
          {props.children}
        </Label>
        <MessageTimestamp time={props.timestamp} />
      </div>
    </div>
  );
};

export default IncomingMessage;
