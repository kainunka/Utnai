import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';
import LoginButton from './components/LoginButton';
import { connect } from 'react-redux';
import { mapStateToProps,  mapDispatchToProps} from './actions/const.action';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import * as types from './constants/actionTypes';

let login = ( navigation, USER_PROFILE, CHECK_LOGIN ) => {
    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native); // defaults to Native
        FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
        if (!error) {
            const pic = JSON.parse(data.profile);
            console.log('Login_success = ' + pic.picture.data.url);

            console.log('Login_success = ', data.credentials.token);
            
            const setStorageToken =  AsyncStorage.setItem('token', data.credentials.token);
            const setStorageUser =  AsyncStorage.setItem('userProfile', data.profile);
            if (setStorageToken && setStorageUser ) {
                console.log('Login OK');
                navigation.dispatch({ 
                    type: types.LOGIN
                }); 
            }            
        } else {
            console.log("Error: ", error);
        }
    })          
}

const Login = ({ navigation, USER_PROFILE, CHECK_LOGIN }) =>   (
    <Image 
    style={styles.container} 
    source={require('./img/bg.png')} >
        <View style={styles.block3}>
        <Image source={ require('./img/logo.png') } style={styles.ImageKids} />
        </View>
            
        <View style={styles.block3}>
            <LoginButton status="Login" social="with Facebooks" color="#3b5998" icon="facebook-official" login={() => login(navigation, USER_PROFILE, CHECK_LOGIN) } />
        
        </View>
    </Image>
)


const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: null,
    height: null,
  },

  block3: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  block2: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
  },
  block1: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  ImageKids: {

      marginBottom: 12   
  },
  footer: {
      fontWeight: 'bold',
      color: '#ffffff'
  }
});


Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};

Login.navigationOptions = {
  header: null,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
