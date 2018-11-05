import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import reduxPromise from 'redux-promise';
import async from 'middlewares/async';
import stateValidator from 'middlewares/stateValidator';
import reducers from 'reducers';

// initialState for testing purpose give data to provider for testing
export default ({ children, initialState={} }) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducers, 
    initialState,
    composeEnhancers(
      applyMiddleware(
        async,
        stateValidator
      )
    ),
  );

  return (
    <Provider store= { store }>
      { children }
    </Provider>
  )
}