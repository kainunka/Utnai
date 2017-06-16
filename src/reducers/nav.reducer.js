import * as types from '../constants/actionTypes';
import { NavigationActions } from 'react-navigation'; 
import { AppNavigator } from '../navigators/AppNavigator';
import initialState from './initialState';

const navReducer = (state = initialState.nav, action) => {
  let nextState;

  switch (action.type) {
    case types.CHECK_TOKEN:
        return {
          ...state,
          nav: action.nav
        }
    case types.LOGIN:
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.back(),
            state
        );
        break;
    case types.LOGOUT:
        nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({
                routeName: 'Login'
            }),
            state
        );
        break;
    default:
		nextState = AppNavigator.router.getStateForAction(action, state);
        break;
  }
  return nextState || state;

} 

export default navReducer;

