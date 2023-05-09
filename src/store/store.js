import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './root-saga';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
  blacklist: ['user'], // persist되지 않길 원함 because this might conflict and clash with local storage in a way where we get some weird interactive behavior we may not want 
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware
].filter(Boolean);
// reducer가 read되기 전에 middlewares를 read함 = logger를 먼저 사용함으로써 enhancement 시킴

const composeEnhencer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhencers = composeEnhencer(applyMiddleware(...middlewares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhencers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);