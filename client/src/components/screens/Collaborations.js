import React, { useState, useEffect } from 'react';
import ScreenTitle from '../ui/ScreenTitle';
import client from '../../feathers';
import { Link } from 'react-router-dom';

import './Collaborations.css';

function Collaborations() {
  const [todolists, setTodoLists] = useState([]);

  useEffect(() => {
    client
      .service('todolists')
      .find()
      .then(todolists => setTodoLists(todolists.data));
  }, []);

  return (
    <div className="collaborations-screen">
      <ScreenTitle title="collaborations" />
      <div className="collaborations-list">
        {todolists.map(todolist => {
          return (
            <Link
              to={`/h/collaborations/todolist/${todolist._id}`}
              key={todolist._id}
            >
              <div className="collaboration-circle">
                <p className="collaboration-text">{todolist.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Collaborations;
