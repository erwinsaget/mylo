import React from 'react';
import { DragSource } from 'react-dnd';
import Types from './ui/DragTypes';
import client from '../feathers';

import './Task.css';

const taskSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { _id: props.task._id };
    return item;
  },

  // When dropped on a compatible target, do something
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      client.service('tasks').patch(item._id, {
        query: {
          status: dropResult.status
        }
      });
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function Task(props) {
  const { task, connectDragSource } = props;
  return connectDragSource(<div className="task">{task.title}</div>);
}

export default DragSource(Types.TASK, taskSource, collect)(Task);
