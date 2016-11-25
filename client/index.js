'use strict';

import React from 'react';
import {render} from 'react-dom';
import RootComponent from './components/RootComponent';
import TorrentView from './components/views/TorrentView';
import {browserHistory, IndexRoute, Router, Route} from 'react-router';

//website
import './index.html';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';

render(
  <Router history={browserHistory}>
    <Route path="/" component={RootComponent}>
      <IndexRoute component={TorrentView} />
    </Route>
  </Router>
  , document.getElementById('react'));