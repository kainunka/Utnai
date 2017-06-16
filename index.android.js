import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers/rootReducer';
import AppWithNavigationState from './src/navigators/AppNavigator';

/*const myLogger = (store) => (next) => (action) => { console.log("Log Action: ", action); next(action); }
const store = createStore(rootReducer, {}, applyMiddleware(myLogger));
store.subscribe(()=> { console.log("Update Store: ", store.getState()); }) */

export default class totoit_utnai extends Component {
  store = createStore(rootReducer, applyMiddleware(thunk));
  render() {
    return (
        <Provider store={ this.store }>
          <AppWithNavigationState />
        </Provider>
    );
  }
}

AppRegistry.registerComponent('totoit_utnai', () => totoit_utnai);
