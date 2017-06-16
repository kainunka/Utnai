import React, { Component, PropTypes } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as types from './constants/actionTypes';
import ProgressBar from './_global/ProgressBar';
import AppNavigator from './navigators/AppNavigator';

class SplashScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
    const { checkToken } = this.props;
    const firstActionMain = AppNavigator.router.getActionForPathAndParams('Main');
    const secondActionLogin = AppNavigator.router.getActionForPathAndParams('Login');
    const tempNavStateMain = AppNavigator.router.getStateForAction(firstAction);

    const firstActionLogin = AppNavigator.router.getActionForPathAndParams('Login');
    const secondActionMain = AppNavigator.router.getActionForPathAndParams('Main');
    const tempNavStateLogin = AppNavigator.router.getStateForAction(firstAction);

        AsyncStorage.getItem('token').then((getToken) => {
            if (!getToken) {
                checkToken(AppNavigator.router.getStateForAction(secondActionLogin,
		tempNavStateMain));
            } else {
                checkToken(AppNavigator.router.getStateForAction(secondActionMain,
		tempNavStateLogin));
            }
            console.log('getTokena' + getToken);
        }); 
    }

    render() {
        const { isLoggedIn } = this.props;
        return (
            (this.state.isLoading) ? <View style={ styles.progressBar }><ProgressBar /></View> :  console.log("OK") 
        )
    }
}

const styles = StyleSheet.create({
   progressBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
});

SplashScreen.propTypes = {
    nav: PropTypes.object.isRequired,
    checkToken: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
    nav: state.nav
})

const mapDispatchToProps = dispatch => ({
    checkToken: (nav) => {
        dispatch({
            type: types.CHECK_TOKEN,
            nav
        })
    }
})

    
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);