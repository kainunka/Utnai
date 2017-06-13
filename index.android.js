import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './src/App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers/rootReducer';

const myLogger = (store) => (next) => (action) => {
  console.log("Log Action: ", action);
  next(action);
}   

const store = createStore(rootReducer, {}, applyMiddleware(myLogger));

store.subscribe(() => {
  console.log("Update Store: ", store.getState());
})

export default class totoit_utnai extends Component {
  

  render() {
    return (
       <Provider store={store}><App /></Provider>
    );
  }
}



AppRegistry.registerComponent('totoit_utnai', () => totoit_utnai);
