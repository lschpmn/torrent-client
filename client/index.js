'use strict';

import React from 'react';
import {render} from 'react-dom';
import RootComponent from './components/RootComponent';

//website
import './index.html';
import './style/bootstrap.min.css';

render(<RootComponent />, document.getElementById('react'));