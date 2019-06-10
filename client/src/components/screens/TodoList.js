import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { addMonths, subMonths, format } from 'date-fns';
import { ReactComponent as RightArrow } from '../../assets/arrow-right.svg';
import { ReactComponent as LeftArrow } from '../../assets/arrow-left.svg';
import CreateTask from '../CreateTask';
import client from '../../feathers';
import Task from '../Task';
import StartTodoList from '../ui/StartTodoList';

import './TodoList.css';

ReactModal.setAppElement('#root');

// const updateStatus = function(id, status) {
//   client.service('tasks').patch(id, {
//     query: {
//       status: status
//     }
//   })
// }

function TodoList(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const [startTasks, setStartTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    const dueOn = format(date, 'MM/DD/YYYY');
    const todolistId = props.match.params.id;

    client
      .service('tasks')
      .find({
        query: {
          dueOn,
          todolistId
        }
      })
      .then(tasks => {
        setStartTasks(tasks.filter(task => task.status === 'start'));
        setInProgressTasks(tasks.filter(task => task.status === 'in progress'));
        setDoneTasks(tasks.filter(task => task.status === 'done'));
      });
  }, [date, props.match.params.id]);

  return (
    <div className="todolist-screen">
      <header className="todolist-header">
        <div className="">
          <button
            className="titleButton"
            onClick={() => setDate(subMonths(date, 1))}
          >
            <LeftArrow />
          </button>
          <span className="todolist-header-text">{date.toDateString()}</span>
          <button
            className="titleButton"
            onClick={() => setDate(addMonths(date, 1))}
          >
            <RightArrow />
          </button>
        </div>
        <button>invite</button>
      </header>
      <div className="todolist-container">
        <div className="todolist-column">
          <StartTodoList
            startTasks={startTasks}
            setModalIsOpen={setModalIsOpen}
          />
          <p>start</p>
        </div>
        <div className="todolist-column">
          <div className="todolist in-progress">
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map(task => <Task key={task._id} task={task} />)
            ) : (
              <div className="task">No Tasks</div>
            )}
          </div>
          <p>in progress</p>
        </div>
        <div className="todolist-column">
          <div className="todolist done">
            {doneTasks.length > 0 ? (
              doneTasks.map(task => <Task key={task._id} task={task} />)
            ) : (
              <div className="task">No Tasks</div>
            )}
          </div>
          <p>done</p>
        </div>
      </div>
      <ReactModal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
      >
        <CreateTask />
        <button onClick={() => setModalIsOpen(false)}>Close Modal</button>
      </ReactModal>
    </div>
  );
}

export default TodoList;
