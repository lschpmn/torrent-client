'use strict';

import React, {Component} from 'react';

export default class Sidebar extends Component {
  render() {
    const linkClasses = 'collection-item black-text grey lighten-2';
    
    return <div className="col s3 grey lighten-2 sidebar" style={{height: '100%'}}>
      <ul className="collection">
        <li><h4 className="center-align">Torrents</h4></li>
        <li><a href="#" className={linkClasses}>Downloads</a></li>
        <li><a href="#" className={linkClasses}>Search</a></li>
        <li><a href="#" className={linkClasses}>Settings</a></li>
      </ul>
    </div>;
  }
}