import {createStore, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas';
import reducers from '../reducers';
import {persistStore, persistReducer} from 'redux-persist';
 
// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  whitelist: [
    'authenticationReducer',
  ],
};
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, reducers);
 
const configureStore = () => {
    const _DEV_ = true;
    const composer = _DEV_ ? composeWithDevTools : compose;
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
      persistedReducer,
      composer(applyMiddleware(sagaMiddleware)),
    );
    sagaMiddleware.run(saga);
    return store;
  };
   
  const store = configureStore();
  const persistor = persistStore(store);
  // persistor.pause()
   
  export {store, persistor};