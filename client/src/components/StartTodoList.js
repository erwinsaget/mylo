import React from 'react';
import Task from './Task';
import { ReactComponent as Plus } from '../assets/plus.svg';

function StartTodoList(props) {
  const { tasks, handleDrop, setModalIsOpen } = props;

  return (
    <div
      className="todolist start"
      onDragOver={e => e.preventDefault()}
      onDrop={e => handleDrop(e, 'start')}
    >
      <div className="todos">
        {tasks.length > 0 ? (
          tasks.map(task => <Task key={task._id} task={task} />)
        ) : (
          <div className="task">No Tasks</div>
        )}
      </div>
      <div className="todolist-add">
        <button className="add-button" onClick={() => setModalIsOpen(true)}>
          <Plus />
        </button>
      </div>
    </div>
  );
}

export default StartTodoList;
