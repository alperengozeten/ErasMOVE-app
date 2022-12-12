import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import $ from 'jquery';
// import Popper from 'popper.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import './styles/index.css';
import AppContainer from './containers/AppContainer';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (composeWithDevTools && composeWithDevTools({
  // actionsBlacklist: [
  //   'AN_ACTION_YOU_DONT_WANT_TO_TRACK',
  // ],
  shouldCatchErrors: true,
})) || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

const container = document.getElementById('root');

// Create a root.
const root = ReactDOM.createRoot(container);

// Initial render
root.render(
  <Provider store={ store }>
      <AppContainer />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
