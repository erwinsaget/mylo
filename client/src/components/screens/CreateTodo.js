import React, { useState } from 'react';
import { format } from 'date-fns';
import ScreenTitle from '../ui/ScreenTitle';
import { Redirect } from 'react-router-dom';
import client from '../../feathers';

import './CreateTodo.css';

function CreateTodo() {
  const [titleInput, setTitleInput] = useState('');
  const [dateInput, setDateInput] = useState(format(new Date(), 'YYYY-MM-DD'));
  const [nameInput, setNameInput] = useState('');
  const [error, setError] = useState(null);
  const [routeToHome, setRouteToHome] = useState(false);
  const [routeToCollaborations, setRouteToCollaborations] = useState(false);
  const [collaborationsError, setCollaborationsError] = useState(null);

  const submitForm = () => {
    client
      .service('todos')
      .create({
        title: titleInput,
        dueOn: format(dateInput, 'MM/DD/YYYY')
      })
      .then(() => setRouteToHome(true))
      .catch(error => setError(error));
  };

  const submitNewCollabForm = () => {
    client
      .service('todolists')
      .create({ name: nameInput })
      .then(() => setRouteToCollaborations(true))
      .catch(error => setCollaborationsError(error));
  };

  if (routeToHome === true) {
    return <Redirect to="/h/todos" />;
  }

  if (routeToCollaborations === true) {
    return <Redirect to="/h/collaborations" />;
  }

  return (
    <div className="todos-screen">
      <ScreenTitle title="Create To-do" />
      <div className="todo-list">
        <form
          className="create-todo-form"
          onSubmit={e => {
            e.preventDefault();
            submitForm();
          }}
        >
          <fieldset>
            <legend>New To-do</legend>
            {error && (
              <div>
                There was an error adding your to-do. Please check inputs and
                try again.
              </div>
            )}
            <div className="form-input">
              <label>Title</label>
              <input
                name="title"
                type="text"
                placeholder=""
                value={titleInput}
                onChange={e => setTitleInput(e.target.value)}
              />
            </div>

            <div className="form-input">
              <label>Due On</label>
              <input
                name="dueOn"
                type="date"
                value={dateInput}
                onChange={e => setDateInput(e.target.value)}
              />
            </div>

            <button type="submit">Create To-do</button>
          </fieldset>
        </form>
        <form
          onSubmit={e => {
            e.preventDefault();
            submitNewCollabForm();
          }}
        >
          <fieldset>
            {collaborationsError && (
              <div>
                There was an error adding your to-do. Please check inputs and
                try again.
              </div>
            )}
            <legend>New Collaborative To-do List</legend>
            <div className="form-input">
              <label>Name for To-do List</label>
              <input
                name="name"
                type="text"
                placeholder=""
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
              />
            </div>
            <p>You can invite people to this to-do list afterwards.</p>
            <button type="submit">Create To-do List</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default CreateTodo;
