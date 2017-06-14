import * as types from '../constants/actionTypes';
import initialState from './initialState';

const constReducer = (state = initialState.const, action) => {
  switch (action.type) {
    case types.CHECK_LOGIN:
        return {
          ...state,
          checkLogin: action.checkLogin
        }
    case types.ON_LOCATION_LAT:
        return {
          ...state,
          onLocationLat: action.onLocationLat
        }
    case types.ON_LOCATION_LONG:
        return {
          ...state,
          onLocationLong: action.onLocationLong
        }
    case types.USER_PROFILE:
        return {
          ...state,
          userProfile: action.userProfile
        }
    default:
			return state;
  }
} 

export default constReducer;

