'use strict';

import React, {Component} from 'react';

export default class Sidebar extends Component {
  render() {
    const linkClasses = 'collection-item black-text grey lighten-2';
    
    return <div className="grey lighten-2" style={{height: '100%'}}>
      <ul className="collection" style={{margin: 0}}>
        <li><h4 className="center-align">Torrents</h4></li>
        <li><a href="#" className={linkClasses}>Downloads</a></li>
        <li><a href="#" className={linkClasses}>Search</a></li>
        <li><a href="#" className={linkClasses}>Settings</a></li>
      </ul>
    </div>;
  }
}