let nextTodoId = 0;
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: (nextTodoId++).toString(),
    text,
  };
};

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
};

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id,
  };
};

// delete todo
export const deleteTodo = (id) => {
  return {
    type: 'DELETE_TODO',
    id,
  };
};

// count total todo
export const totalCountTodo = () => {
    return {
        type: 'TOTAL_COUNT',    
    };
}