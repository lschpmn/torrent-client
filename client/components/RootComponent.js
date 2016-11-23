'use strict';

import React, {Component} from 'react';
import {Button, Col, Grid, Row} from 'react-bootstrap';

export default class RootComponent extends Component {
  render() {
    return <Grid>
      <Row>
        <Col xs={12}>
          Hello World
          <Button>Hello</Button>
        </Col>
      </Row>
    </Grid>;
  }
}