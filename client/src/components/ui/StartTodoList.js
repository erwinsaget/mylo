import React from 'react';
import { DropTarget } from 'react-dnd';
import Task from '../Task';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import Types from './DragTypes';
import client from '../../feathers';

const spec = {
  canDrop() {
    return true;
  },

  drop(props, monitor, component) {
    // Obtain the dragged item
    const item = monitor.getItem();

    client.service('tasks').patch(item._id, {
      query: {
        status: 'start'
      }
    });

    if (!monitor.didDrop()) {
      console.log('it did not drop');
    }
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      console.log('it dropped');
      return;
    }
    console.log('the item is ', item);
    return { moved: true, status: 'start' };
  }
};

const collect = function(connect, monitor, props) {
  return {
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
};

function StartTodoList(props) {
  const { startTasks, setModalIsOpen, connectDropTarget } = props;

  return connectDropTarget(
    <div className="todolist start">
      {startTasks.length > 0 ? (
        startTasks.map(task => <Task key={task._id} task={task} />)
      ) : (
        <div className="task">No Tasks</div>
      )}
      <div className="todolist-add">
        <button className="add-button" onClick={() => setModalIsOpen(true)}>
          <Plus />
        </button>
      </div>
    </div>
  );
}

export default DropTarget(Types.TASK, spec, collect)(StartTodoList);
