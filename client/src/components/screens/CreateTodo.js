import React, { useState } from 'react';
import { format } from 'date-fns';
import ScreenTitle from '../ui/ScreenTitle';
import client from '../../feathers';

import './CreateTodo.css';

function CreateTodo() {
  const [titleInput, setTitleInput] = useState('');
  const [dateInput, setDateInput] = useState(format(new Date(), 'YYYY-MM-DD'));
  const [error, setError] = useState(null);

  const submitForm = () => {
    client
      .service('todos')
      .create({
        title: titleInput,
        dueOn: format(dateInput, 'MM/DD/YYYY')
      })
      .catch(error => setError(error));
  };

  return (
    <div className="todos-screen">
      <ScreenTitle title="Create Todo" />
      <div className="todo-list">
        <form
          className="create-todo-form"
          onSubmit={e => {
            e.preventDefault();
            submitForm();
          }}
        >
          {error && (
            <div>
              There was an error adding your todo. Please check inputs and try
              again.
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

          <button type="submit">Create Todo</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTodo;
