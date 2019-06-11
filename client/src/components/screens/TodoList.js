import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { addMonths, subMonths, format } from 'date-fns';
import { ReactComponent as RightArrow } from '../../assets/arrow-right.svg';
import { ReactComponent as LeftArrow } from '../../assets/arrow-left.svg';
import CreateTask from '../CreateTask';
import client from '../../feathers';
import StartTodoList from '../StartTodoList';
import InProgressTodoList from '../InProgressTodoList';
import DoneTodoList from '../DoneTodoList';

import './TodoList.css';

ReactModal.setAppElement('#root');

const updateStatus = function(id, status) {
  return client.service('tasks').patch(id, { status: status });
};

function TodoList(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [startTasks, setStartTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [todolist, setTodolist] = useState({});
  const todolistId = props.match.params.id;

  const filterTasks = function(tasks) {
    setTasks(tasks);
  };

  const addTask = function(task) {
    setTasks([...tasks, task]);
  };

  useEffect(() => {
    client
      .service('todolists')
      .get(todolistId)
      .then(res => setTodolist(res));
  }, [todolistId]);

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
      .then(tasks => filterTasks(tasks));
  }, [date, props.match.params.id]);

  useEffect(() => {
    setStartTasks(tasks.filter(task => task.status === 'start'));
    setInProgressTasks(tasks.filter(task => task.status === 'in progress'));
    setDoneTasks(tasks.filter(task => task.status === 'done'));
  }, [tasks]);

  const handleDrop = async (event, status) => {
    const taskId = event.dataTransfer.getData('taskId');
    let updatedTask;

    try {
      updatedTask = await updateStatus(taskId, status);
    } catch (err) {
      alert('There was an error updating the task. Please try again.');
      return;
    }

    const updatedTasks = tasks.slice(tasks);

    const index = updatedTasks.findIndex(function(task) {
      return task._id === taskId;
    });

    updatedTasks[index] = updatedTask;

    filterTasks(updatedTasks);
  };

  const sendInvite = event => {
    event.preventDefault();

    client
      .service('todolists')
      .patch(todolistId, {
        $push: {
          invitedEmails: inviteEmail
        }
      })
      .then(() => {
        setInviteEmail('');
        setShowInviteForm(false);
      })
      .catch(err => {
        setShowInviteForm(false);
      });
  };
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
        <button onClick={() => setShowInviteForm(true)}>invite</button>
      </header>
      <div className="todolist-container">
        <div className="todolist-column">
          <StartTodoList
            tasks={startTasks}
            setModalIsOpen={setModalIsOpen}
            handleDrop={handleDrop}
          />
          <p>start</p>
        </div>
        <div className="todolist-column">
          <InProgressTodoList tasks={inProgressTasks} handleDrop={handleDrop} />
          <p>in progress</p>
        </div>
        <div className="todolist-column">
          <DoneTodoList tasks={doneTasks} handleDrop={handleDrop} />
          <p>done</p>
        </div>
      </div>
      <ReactModal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={showInviteForm}
      >
        <form>
          <div className="form-input">
            <label>Email</label>
            <input
              type="email"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
            />
          </div>
          <button onClick={sendInvite}>Send Invite</button>
          <button onClick={() => setShowInviteForm(false)}>Cancel</button>
        </form>
      </ReactModal>
      <ReactModal
        className="Modal"
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
      >
        <CreateTask
          setModalIsOpen={setModalIsOpen}
          addTask={addTask}
          todolist={todolist}
        />
      </ReactModal>
    </div>
  );
}

export default TodoList;
