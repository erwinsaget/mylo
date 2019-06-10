import React from 'react';
import Task from './Task';

function DoneTodoList(props) {
  const { tasks, handleDrop } = props;

  return (
    <div
      className="todolist done"
      onDragOver={e => e.preventDefault()}
      onDrop={e => handleDrop(e, 'done')}
    >
      {tasks.length > 0 ? (
        tasks.map(task => <Task key={task._id} task={task} />)
      ) : (
        <div className="task">No Tasks</div>
      )}
    </div>
  );
}

export default DoneTodoList;
