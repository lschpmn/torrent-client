'use strict';

import React from 'react';
import {render} from 'react-dom';
import RootComponent from './components/RootComponent';

//website
import './index.html';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

render(<RootComponent />, document.getElementById('react'));