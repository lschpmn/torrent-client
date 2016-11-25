'use strict';

import React from 'react';
import {render} from 'react-dom';
import RootComponent from './components/RootComponent';
import SearchView from './components/views/SearchView';
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
      <Route path="/search" component={SearchView} />
    </Route>
  </Router>
  , document.getElementById('react'));