import React, { Component, PropTypes } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import * as types from '../constants/actionTypes';

import Login from '../Login';
import Index from '../Index';

export const AppNavigator = StackNavigator({
    Login: { screen: Login },
    Main: { screen: Index }
})

class AppWithNavigationState extends Component {
    render() {
        const { dispatch, nav } = this.props;
        return (
             <AppNavigator navigation={ addNavigationHelpers({
                dispatch,
                state: nav
            })} />
        )
    }    
}

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);

/*import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationLogin from './NavigatorLogin';
import NavigationMain from './NavigatorMain';

class AppNavigator extends Component {
    render() {
        return (
            this.props.isLoggedIn ? <NavigationMain /> : <NavigationLogin />
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(AppNavigator);*/