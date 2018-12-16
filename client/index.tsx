import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';

import './index.html';
import reducers from './lib/reducers';

const store = createStore(reducers, applyMiddleware(thunk));

render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('react'));