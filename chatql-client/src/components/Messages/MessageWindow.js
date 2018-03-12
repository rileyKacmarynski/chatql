import React from 'react';
import { Segment, Label, Dimmer, Loader } from 'semantic-ui-react';

const MessageWindow = (props) => {

  let messageContent;
  if( props.loading || !props.messages ){
    messageContent = (
      <Dimmer inverted active={props.loading}>
        <Loader content='Loading messages' />
      </Dimmer>
    )
  } else {
    messageContent = props.messages.map((m, index) => {
      if( props.user && props.user.id !== m.sentBy.id){
        return (
          <div key={index} style={{ 
              display: 'flex',
              justifyContent: 'flex-start',
              maxWidth:'70%',
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
          maxWidth:'70%',
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
  }
  
  
  
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
