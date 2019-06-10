import React, { useState } from 'react';
import { format } from 'date-fns';
import client from '../feathers';

function CreateTask(props) {
  const [title, setTitleInput] = useState('');
  const [date, setDateInput] = useState(format(new Date(), 'YYYY-MM-DD'));
  const [points, setPoints] = useState(0);
  const [error, setError] = useState(null);

  const submitForm = e => {
    e.preventDefault();

    client
      .service('tasks')
      .create({
        title,
        date,
        points,
        dueOn: format(date, 'MM/DD/YYYY'),
        status: 'start',
        todolistId: props.todolist._id
      })
      .then(res => {
        props.addTask(res);
        props.setModalIsOpen(false);
      })
      .catch(error => setError(error));
  };

  return (
    <form onSubmit={submitForm}>
      <h1>New To-Do</h1>
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
          value={title}
          onChange={e => setTitleInput(e.target.value)}
        />
      </div>

      <div className="form-input">
        <label>Due On</label>
        <input
          name="dueOn"
          type="date"
          value={date}
          onChange={e => setDateInput(e.target.value)}
        />
      </div>

      <div className="form-input">
        <label>Points</label>
        <input
          name="points"
          type="number"
          value={points}
          onChange={e => setPoints(e.target.value)}
        />
      </div>
      <button type="submit" onClick={submitForm}>
        Create Todo
      </button>
      <button onClick={() => props.setModalIsOpen(false)}> Cancel</button>
    </form>
  );
}

export default CreateTask;
