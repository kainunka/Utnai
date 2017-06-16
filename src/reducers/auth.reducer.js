import * as types from '../constants/actionTypes';
import initialState from './initialState';
import { AsyncStorage } from 'react-native';

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.LOGIN:
        return {
          ...state,
          isLoggedIn: true
        }
    case types.LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          clearToken: AsyncStorage.removeItem('token')
        }
    default:
		return state;
  }
} 

export default authReducer;

