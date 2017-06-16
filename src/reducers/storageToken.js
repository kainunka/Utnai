import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

class StorageToken extends Component {

    constructor(props) {
       super(props);
       this.state = {
           token: null
       }
    }
     async _getToken() {
     try {
      let token = await AsyncStorage.getItem('token');
      console.log('testToken : ' + token);
      } catch(error) {
       console.log(error);
      }
     }

    render() {
        return this._getToken;
    }
}

export default StorageToken;