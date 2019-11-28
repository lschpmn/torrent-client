import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import App from './App';
import electronMiddleware from './lib/electronMiddleware';
import loggerMiddleware from './lib/loggerMiddleware';
import reducers from './lib/reducers';
import socketMiddleware from './lib/socketMiddleware';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const store = createStore(reducers, applyMiddleware(loggerMiddleware, socketMiddleware, electronMiddleware));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: green.A400,
    },
    secondary: {
      main: blue['500'],
    },
    error: red,
  },
});

render((
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </Provider>
), document.getElementById('react'));
