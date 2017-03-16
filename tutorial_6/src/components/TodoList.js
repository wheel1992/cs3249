import React, { PropTypes } from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick, onDeleteTodoClick }) => (
    
    <div>
        <p><b>Total Todos: { todos.length }</b></p>
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
        onBtnDeleteClick={() => onDeleteTodoClick(todo.id)}
      />
    )}
  </ul>
  
  </div>
);

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired,
    onDeleteTodoClick: PropTypes.func.isRequired,
};

export default TodoList;
