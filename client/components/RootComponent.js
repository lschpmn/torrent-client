'use strict';

import React, {Component} from 'react';
import Siderbar from './Sidebar';

export default class RootComponent extends Component {
  render() {
    return <div style={{height: '100%'}}>
      <Siderbar />
    </div>;
  }
}