import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Messenger from '../containers/Messenger/Messenger';

configure({ adapter: new Adapter()});

describe('')