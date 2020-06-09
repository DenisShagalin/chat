import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import storage from 'redux-persist/lib/storage';
import reducers from './common/reducers';
import sagas from './common/sagas';

const composeEnhancers = composeWithDevTools({
  maxAge: 25,
  latency: 1500,
});

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'Chat',
  storage,
  blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(
      applyMiddleware(sagaMiddleware),
    ),
  );
  sagaMiddleware.run(sagas);
  const persistor = persistStore(store);
  return { persistor, store };
};