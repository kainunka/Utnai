import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';
import Login from './Login';
import Index from './page/Index';
import Example from './page/Example';
import { connect } from 'react-redux';
import { mapStateToProps,  mapDispatchToProps} from './actions/const.action';
import { StackNavigator } from 'react-navigation';

class App extends Component {
  componentWillMount() {
    const { CHECK_LOGIN } = this.props;
    AsyncStorage.getItem('token').then((getToken) => {
        if (getToken) {
            CHECK_LOGIN(true);
        } else {
            CHECK_LOGIN(false);
        }

        console.log('getTokena' + getToken);
    }); 
    
  }

  render() {
    const { checkLogin, userProfile, userPic } = this.props.const;

    return (
      (checkLogin == true) ? <SimpleApp screenProps={{nameLogin: userProfile.name, imageLogin: userPic}} /> : <Login />
      
    );
  }
}

const SimpleApp = StackNavigator({
  Index: { screen: Index, },
  Example: { screen: Example }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
