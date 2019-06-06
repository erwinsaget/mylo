import React, { useState } from 'react';
import { format } from 'date-fns';
import client from '../feathers';

const submitForm = () => {};

function CreateTask(props) {
  const [titleInput, setTitleInput] = useState('');
  const [dateInput, setDateInput] = useState(format(new Date(), 'YYYY-MM-DD'));
  const [error, setError] = useState(null);

  const submitForm = () => {
    client
      .service('tasks')
      .create({
        title: titleInput,
        dueOn: format(dateInput, 'MM/DD/YYYY')
      })
      .then(() => {})
      .catch(error => setError(error));
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        submitForm();
      }}
    >
      <fieldset>
        <legend>New Todo</legend>

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
      </fieldset>
    </form>
  );
}

export default CreateTask;
