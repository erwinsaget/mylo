import React, { useState } from 'react';
import client from '../feathers';

import './Todo.css';

function Todo(props) {
  const { todo } = props;

  const [completedStatus, setCompletedStatus] = useState(todo.completed);
  const [classNames, setClassNames] = useState(
    todo.completed === true ? 'todo completed' : 'todo'
  );

  const changeTodoStatus = async status => {
    const newStatus = !status;

    setCompletedStatus(newStatus);

    newStatus === true
      ? setClassNames('todo completed')
      : setClassNames('todo');

    const result = await client
      .service('todos')
      .patch(todo._id, { completed: newStatus });
  };

  return (
    <p className={classNames} onClick={() => changeTodoStatus(completedStatus)}>
      {todo.title}
    </p>
  );
}

export default Todo;
