import { combineReducers } from 'redux';
import constReducer from './const.reducer';
import feedReducer from './feed.reducer';

const rootReducer = combineReducers({
    const: constReducer,
    feed: feedReducer
})

export default rootReducer;