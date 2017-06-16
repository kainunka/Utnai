import React, { PropTypes } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import LoginButton from './LoginButton';
import { NavigationActions } from 'react-navigation';
import * as types from '../constants/actionTypes';

const AuthButton = ({ logout, loginScreen, isLoggedIn }) => (
    <LoginButton 
        status={ 'Logout'  }
        social={ 'account facebook' }
        color="#3b5998" 
        icon={ 'sign-out' }
        login={ logout } 
      />
);

AuthButton.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    loginScreen: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    clearToken: state.auth.clearToken
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({
        type: types.LOGOUT
    }),
    loginScreen: () => dispatch(
        NavigationActions.navigate({
            routeName: 'Login'
        })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);