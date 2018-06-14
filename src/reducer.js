import quiz from './reducers/quiz';
import { combineReducers } from 'redux';
import settings from './reducers/settings';

export default combineReducers({
  quiz,
  settings
});
