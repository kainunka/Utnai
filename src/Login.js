import React, { Component } from 'react';
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

class Login extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `Login user: ${navigation.state.params.user}`,
  })

  constructor(props) {
      super(props)
      this.loginFacebook = this.loginFacebook.bind(this)
  }


   handleLogin = (data) => {
       if (data == 'test') {
            this.props.CHECK_LOGIN(true)
       } else {
           console.log('Error');
       }
        
    }

  loginFacebook() {
    const { USER_PROFILE, USER_PIC, CHECK_LOGIN } = this.props;

    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native); // defaults to Native
    FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
    if (!error) {
        const pic = JSON.parse(data.profile);
        console.log('Login_success = ' + pic.picture.data.url);

        console.log('Login_success = ', data.credentials.token);

        const setStorageToken = AsyncStorage.setItem('token', data.credentials.token);
        const setStorageUser = AsyncStorage.setItem('userProfile', data.profile);
        const setStoragePic = AsyncStorage.setItem('picture', pic.picture.data.url);

        if (setStorageToken && setStorageUser && setStoragePic) {
            CHECK_LOGIN(true);
        }
            
    } else {
        console.log("Error: ", error);
    }
    })
  }


  render() {
      var _this = this;
    return (
        <Image 
        style={styles.container} 
        source={require('./img/bg.png')} >
            <View style={styles.block3}>
            <Image source={ require('./img/logo.png') } style={styles.ImageKids} />
            </View>
               
            <View style={styles.block3}>
                <LoginButton status="Login" social="with Facebooks" color="#3b5998" icon="facebook-official" login={ this.loginFacebook } />
         
            </View>
        </Image>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
