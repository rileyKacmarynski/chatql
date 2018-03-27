import React from "react";
import moment from "moment";

const MessageTimestamp = props => {
  const style = {
    ...props.style,
    fontSize: ".8rem",
  };

  return (
    <div style={style}>
      {moment(props.time).fromNow()}
    </div>
  );
};
//new Date(props.time).toLocaleString()
export default MessageTimestamp;
