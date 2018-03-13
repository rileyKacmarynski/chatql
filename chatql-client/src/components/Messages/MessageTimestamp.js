import React from 'react';
import moment from 'moment';

const MessageTimestamp = (props) => {
  return (
    <div style={{fontSize: '.8rem', marginLeft: '5px'}} >
      {moment(props.time).fromNow()}
    </div>
  )
};

export default MessageTimestamp;
