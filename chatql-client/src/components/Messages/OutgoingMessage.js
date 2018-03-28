import React from "react";
import { Label } from "semantic-ui-react";

import MessageTimestamp from "./MessageTimestamp";

const OutgoingMessage = props => {
  return (
    <div
      key={props.id}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        maxWidth: "70%",
        marginLeft: "30%",
        marginBottom: "10px",
        borderRadius: "10px",
        flexWrap: "wrap"
      }}
    >
      <div
        style={{

        }}
      >
        <Label
          pointing="right"
          color="pink"
          style={{ margin: "0", lineHeight: "1.2", display: 'block', float: 'right' }}
        >
          {props.children}
        </Label>
        <div>
          <MessageTimestamp time={props.timestamp} style={{ float: 'right'}} />
        </div>
      </div>
    </div>
  );
};

export default OutgoingMessage;
