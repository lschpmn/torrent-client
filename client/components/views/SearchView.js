'use strict';

import React, {Component} from 'react';

export default class SearchView extends Component {
  render() {
    return <div className="row">
      <nav>
        <div className="nav-wrapper blue lighten-1">
          <form onSubmit={e => e.preventDefault()}>
            <div className="input-field">
              <input id="search" type="search" />
              <label htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
      
      <div className="col s12">
        
      </div>
    </div>;
  }
}