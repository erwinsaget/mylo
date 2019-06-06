import React from 'react';

import './Task.css';

function Task(props) {
  const { task } = props;

  return <div className="task">{task.title}</div>;
}

export default Task;
