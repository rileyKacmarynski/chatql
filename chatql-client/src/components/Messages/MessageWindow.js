import React from 'react';
import { Segment, Label } from 'semantic-ui-react';

const MessageWindow = (props) => {
  const messageContent = props.messages.map((m, index) => {
    if(index % 2 == 0){
      return (
        <div key={index} style={{ 
            display: 'flex',
            justifyContent: 'flex-start',
            'max-width':'70%',
            marginRight: '30%',
            marginBottom: '10px',              
            borderRadius: '10px',
            }}>
          <Label pointing='left' color='white' style={{lineHeight: '1.2'}}>
            {m.content}
            <Label.Detail style={{display:'block', marginLeft: '0'}}>{m.sentBy.username}</Label.Detail>
          </Label>
        </div>)
    }
    return(
    <div key={index} style={{
        display: 'flex',
        justifyContent: 'flex-end',
        'max-width':'70%',
        marginLeft: '30%',
        marginBottom: '10px',
        borderRadius: '10px',
      }}>
      <Label pointing='right' color='pink' style={{alignItems: 'flex-end', lineHeight: '1.2'}} >
        {m.content}
        <Label.Detail style={{display:'block', marginLeft: '0'}}>{m.sentBy.username}</Label.Detail>
      </Label>
    </div>
  )
  });
  
  
  return (
    <Segment secondary 
    style={{
      height: '60vh',
      display: 'flex',
      'flex-flow': 'column',
    }} >
    {messageContent}
  </Segment>
  )
};

export default MessageWindow;
