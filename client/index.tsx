import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import App from './App';
import electronMiddleware from './lib/electronMiddleware';
import loggerMiddleware from './lib/loggerMiddleware';
import reducers from './lib/reducers';
import socketMiddleware from './lib/socketMiddleware';

const store = createStore(reducers, applyMiddleware(loggerMiddleware, socketMiddleware, electronMiddleware));

render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('react'));
