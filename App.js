/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import AppNavigator from './src/route/AppStack';
import { Provider } from 'react-redux';
import { store, persistor } from "./src/store";
import { PersistGate } from 'redux-persist/es/integration/react';

const App = () => {


  return (
   
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    
  );
};



export default App;
