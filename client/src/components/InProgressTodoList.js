import React from 'react';
import Task from './Task';

function InProgressTodoList(props) {
  const { tasks, handleDrop } = props;

  return (
    <div
      className="todolist in-progress"
      onDragOver={e => e.preventDefault()}
      onDrop={e => handleDrop(e, 'in progress')}
    >
      {tasks.length > 0 ? (
        tasks.map(task => <Task key={task._id} task={task} />)
      ) : (
        <div className="task">No Tasks</div>
      )}
    </div>
  );
}

export default InProgressTodoList;
