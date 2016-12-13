'use strict';

import React, {Component} from 'react';

export default class SearchView extends Component {
  constructor() {
    super();
    
    this.state = {
      search: '',
    };
    
    this._submit = this._submit.bind(this);
  }
  
  _submit(e) {
    //prevents form being submitted and refreshing page
    e.preventDefault();
    
    const evtSource = new EventSource(`http://localhost:3000/api/search?search=${encodeURIComponent(this.state.search)}&num=50`);
    
    evtSource.onmessage = function(e) {
      console.log(e);
      
      if(e.data === 'done') {
        console.log('done');
        evtSource.close();
      }
    };
    
    evtSource.onerror = function(e) {
      console.log(e);
      evtSource.close();
    };
  }
  
  render() {
    return <div className="row">
      <nav>
        <div className="nav-wrapper blue lighten-1">
          <form onSubmit={this._submit}>
            <div className="input-field">
              <input id="search"
                     type="search"
                     value={this.state.search}
                     onChange={e => this.setState({search: e.target.value})}
              />
              
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