import { combineReducers } from 'redux';
import constReducer from './const.reducer';

const rootReducer = combineReducers({
    const: constReducer
})

export default rootReducer;