import React from 'react';
import client from '../feathers';

import './Task.css';

function Task(props) {
  const { task } = props;

  const handleDragStart = (event, task) => {
    event.dataTransfer.setData('taskId', task._id);
  };

  return (
    <div className="task" draggable onDragStart={e => handleDragStart(e, task)}>
      {task.title}
    </div>
  );
}

export default Task;
