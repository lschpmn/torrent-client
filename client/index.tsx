import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import App from './App';

import './index.html';
import loggerMiddleware from './lib/loggerMiddleware';
import reducers from './lib/reducers';
import { bindDispatch } from './lib/services';
import socketMiddleware from './lib/socketMiddleware';

const store = createStore(reducers, applyMiddleware(thunk, loggerMiddleware, socketMiddleware));
bindDispatch(store.dispatch);

render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('react'));
