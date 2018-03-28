import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const DimLoader = (props) => {
  return (
    <Dimmer inverted active={props.loading}>
      <Loader content={props.message} />
    </Dimmer>
  )
};

export default DimLoader;
