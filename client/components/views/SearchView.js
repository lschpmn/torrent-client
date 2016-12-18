'use strict';

import React, {Component} from 'react';

export default class SearchView extends Component {
  constructor() {
    super();
    
    this.state = {
      evtSource: null,
      results: [],
      search: '',
    };
    
    this._submit = this._submit.bind(this);
  }
  
  _submit(e) {
    //prevents form being submitted and refreshing page
    e.preventDefault();
    
    if(this.state.evtSource) this.state.evtSource.close();//close request if ongoing
    const evtSource = new EventSource(`http://localhost:3000/api/search?search=${encodeURIComponent(this.state.search)}&num=100`);
    this.setState(evtSource);
    this.setState({results: []});
    
    evtSource.onmessage = (e) => {
      if(e.data === 'done') {
        console.log('done');
        evtSource.close();
        this.setState({evtSource: null});
      } else {
        const results = safeParseJson(e.data);
        
        this.setState({results: this.state.results.concat(results)});
      }
    };
    
    evtSource.onerror = (e) => {
      console.log(e);
      evtSource.close();
      this.setState({evtSource: null});
    };
  }
  
  render() {
    return <div className="row" style={styles.container}>
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
      
      <div className="col s12" style={styles.content}>
        {!!this.state.results.length && <ul className="collapsible" id={this.state.id}>
          {this.state.results.map(/**TorrentResult*/result => (
            <li key={result.magnetLink}>
              <div className="collapsible-header">{result.name}</div>
              <div className="collapsible-body">{result.name} and more!</div>
            </li>
          ))}
        </ul>}
      </div>
    </div>;
  }
}

function safeParseJson(string) {
  try {
    return JSON.parse(string);
  } catch(err) {
    return [];
  }
}

const styles = {
  container: {
    height: '100%',
    margin: '1em',
    marginBottom: '-2em',
    overflow: 'auto',
  },
  
  content: {
    margin: '1em 0',
  },
};