'use strict';

import axios from 'axios';
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
    
    axios.post('http://localhost:3000/api/search', {search: this.state.search})
      .then(res => console.log(res))
      .catch(err => console.log(err));
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