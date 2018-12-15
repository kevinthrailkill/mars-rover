/**
 * Redux Reducers
 */
import { combineReducers } from 'redux';
import marsReducer from './MarsReducer';

const reducers = combineReducers({
  mars: marsReducer
});

export default reducers;
