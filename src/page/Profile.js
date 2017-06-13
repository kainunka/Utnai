import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../actions/const.action';
import LoginButton from '../components/LoginButton';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);  
  }

  logout() {
    const { CHECK_LOGIN, USER_PROFILE, USER_PIC } = this.props;
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userProfile');
    AsyncStorage.removeItem('picture');
    AsyncStorage.getItem('token').then((logout) => {
          if (!logout) {
            CHECK_LOGIN(false);
          }        
    }); 
  }

  render() {
    const { userProfile, userPic } = this.props.const;

    return (
      <ScrollView>
        <View style={styles.container}>
            <Image
            style={{width: 150, height: 150, marginBottom: 20, marginTop: 20, flex: 1 }}
            source={{uri: 'https://graph.facebook.com/'+userProfile.id+'/picture?type=large' }}
            />
            <View style={ styles.content }>
                <Text> Name : { userProfile.name }</Text>
                <Text> Email : { userProfile.email }</Text>
                <Text> Sex : { userProfile.gender }</Text>
            </View>

            <LoginButton status="Logout" social="account facebook" color="#3b5998" icon="sign-out" login={ this.logout } style={ styles.footer } />
        </View>
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  content: {
      flex: 3
  },
  footer: {
      flex: 1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
