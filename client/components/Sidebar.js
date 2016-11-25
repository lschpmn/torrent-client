'use strict';

import React, {Component} from 'react';

export default class Sidebar extends Component {
  render() {
    return <ul id="slide-out" className="side-nav fixed grey lighten-2">
      <li><h4 className="center-align">Torrents</h4></li>
      <li><a href="#!">Downloads</a></li>
      <li><a href="#!">Search</a></li>
    </ul>;
  }
}