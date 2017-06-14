import * as types from '../constants/actionTypes';
import initialState from './initialState';

const feedReducer = (state = initialState.feed, action) => {
  switch (action.type) {
    case types.FEED_DATA:
        return {
          ...state,
          feedData: action.feedData
        }
    default:
		return state;
  }
} 

export default feedReducer;

