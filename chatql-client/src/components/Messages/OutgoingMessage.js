import React from 'react';
import { Label } from 'semantic-ui-react';

import MessageTimestamp from './MessageTimestamp';

const OutgoingMessage = (props) => {
  return (
    <div key={props.id} style={{
      display: 'flex',
      justifyContent: 'flex-end',
      maxWidth:'70%',
      marginLeft: '30%',
      marginBottom: '10px',
      borderRadius: '10px',
      flexWrap: 'wrap',
    }}>
      <div>
        <Label pointing='right' color='pink' style={{alignItems: 'flex-end', lineHeight: '1.2'}} >
          {props.children}
        </Label>
        <MessageTimestamp time={props.timestamp} />      
      </div>
    </div>
  )
};

export default OutgoingMessage;
