import { combineReducers } from 'redux';
import constReducer from './const.reducer';
import feedReducer from './feed.reducer';
import navReducer from './nav.reducer';
import authReducer from './auth.reducer';

const rootReducer = combineReducers({
    nav: navReducer,
    auth: authReducer,
    const: constReducer,
    feed: feedReducer
})

export default rootReducer;