import React, { PropTypes } from 'react';

const Todo = ({ onClick, onBtnDeleteClick, completed, text }) => (
    <div>
        <li
            onClick={onClick}
            style={{
                textDecoration: completed ? 'line-through' : 'none',
                display: 'inline-block',
            }}
            >
            {text}
        </li>
    
        <button onClick={onBtnDeleteClick} style={{
            display: 'inline-block',
            marginLeft: "1.5em",}}
        >Delete</button>
   
    </div>
);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    onBtnDeleteClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};

export default Todo;
