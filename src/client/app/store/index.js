import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';

import { reducers } from './reducers';

export const createAppStore = (history = undefined, preloadedState = undefined) => {
  // Create persist config
  const persistConfig = {
    key: 'localstorage',
    storage,
    whitelist: ['session']
  };

  // Create middleware
  const middlewares = [];
  if (history) {
    middlewares.push(routerMiddleware(history));
  }
  middlewares.push(thunk);

  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
    middlewares.push(logger);
  }

  // Create enhancers
  const reduxDevtoolsEnhancer =
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

  const enhancers = [applyMiddleware(...middlewares)];

  if (reduxDevtoolsEnhancer) {
    enhancers.push(reduxDevtoolsEnhancer);
  }

  // Create root reducer
  const rootReducer = combineReducers({
    ...reducers,
    router: routerReducer
  });

  // Create persisted reducer
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // Create store
  const store = createStore(persistedReducer, preloadedState, compose(...enhancers));
  const persistor = persistStore(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducers = require('./reducers').reducers;
      const rootReducer = combineReducers({
        ...nextReducers,
        router: routerReducer
      });

      store.replaceReducer(rootReducer);
    });
  }

  return { store, persistor };
};
