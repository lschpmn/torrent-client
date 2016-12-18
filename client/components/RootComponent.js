'use strict';

import React, {Component} from 'react';
import Siderbar from './Sidebar';

export default class RootComponent extends Component {
  render() {
    return <div style={{height: '100%', margin: 0, padding: 0}} className="row">
      <div className="col s3" style={{height: '100%', margin: 0, padding: 0}}>
        <Siderbar />
      </div>
      
      <div className="col s9" style={container}>
        {this.props.children}
      </div>
    </div>;
  }
}

const container = {
  height: '100%',
  overflow: 'hidden',
  margin: 0,
  padding: 0,
};