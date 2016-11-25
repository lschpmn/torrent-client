'use strict';

import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Sidebar extends Component {
  render() {
    const linkClasses = 'collection-item black-text grey lighten-2';
    
    return <div className="grey lighten-2" style={{height: '100%'}}>
      <ul className="collection" style={{margin: 0}}>
        <li><h4 className="center-align">Torrents</h4></li>
        <li><Link to="/" className={linkClasses}>Downloads</Link></li>
        <li><Link to="/search" className={linkClasses}>Search</Link></li>
        <li><Link to="/settings" className={linkClasses}>Settings</Link></li>
      </ul>
    </div>;
  }
}