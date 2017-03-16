import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
//import totalCount from './totalCount';

/*
const todoApp = combineReducers({
  todos,
  visibilityFilter,
});
*/

const todoApp = combineReducers({
    todos,
    visibilityFilter,
});

export default todoApp;
