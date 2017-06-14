import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Image
} from 'react-native';
import Login from './Login';
import Index from './page/Index';
import Example from './page/Example';
import { connect } from 'react-redux';
import { mapStateToProps,  mapDispatchToProps} from './actions/const.action';
import { StackNavigator } from 'react-navigation';
import ProgressBar from './_global/ProgressBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentWillMount() {
		this._retrieveApp();
	}

  componentWillReceiveProps() {
			this.setState({ isLoading: false });
	}

  _retrieveApp() {
    const { CHECK_LOGIN } = this.props;
    AsyncStorage.getItem('token').then((getToken) => {
        if (!getToken) {
            CHECK_LOGIN(false);
        } else {
            CHECK_LOGIN(true);
        }
        console.log('getTokena' + getToken);
    }); 
   
  }

  render() {
    const { checkLogin, userProfile } = this.props.const;

    return (
       this.state.isLoading ? <Image source={ require('./img/bg.png') } style={ styles.progressBar }><ProgressBar /></Image> : 
      (checkLogin == false) ?  <Login />  :  <SimpleApp screenProps={{nameLogin: userProfile.name}} /> 
      
    );
  }
}

const styles = StyleSheet.create({
   progressBar: {
		flex: 1,
    width: null,
    height: null,
		justifyContent: 'center',
		alignItems: 'center'
	},
});

const SimpleApp = StackNavigator({
  Index: { screen: Index, },
  Example: { screen: Example }
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
