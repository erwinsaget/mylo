import React, { useState, useEffect } from 'react';
import { ReactComponent as RightArrow } from '../../assets/arrow-right.svg';
import { ReactComponent as LeftArrow } from '../../assets/arrow-left.svg';
import ScreenTitle from '../ui/ScreenTitle';
import { subDays, addDays, format } from 'date-fns';
import Todo from '../Todo';
import client from '../../feathers';

import './TodoList.css';

function TodoList(props) {
  const dateToUse = props.match.params.date
    ? new Date(props.match.params.date)
    : new Date();
  const [date, setDate] = useState(dateToUse);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    client
      .service('todos')
      .find({
        query: {
          dueOn: format(date, 'MM/DD/YYYY')
        }
      })
      .then(todos => setTodos(todos));
  }, [date]);

  return (
    <div className="todos-screen">
      <ScreenTitle>
        <div className="title">
          <button
            className="titleButton"
            onClick={() => setDate(subDays(date, 1))}
          >
            <LeftArrow />
          </button>
          {date.toDateString()}
          <button
            className="titleButton"
            onClick={() => setDate(addDays(date, 1))}
          >
            <RightArrow />
          </button>
        </div>
      </ScreenTitle>
      <div className="todo-list">
        {todos.length > 0 ? (
          todos.map(todo => <Todo key={todo._id} todo={todo} />)
        ) : (
          <p className="todo">There aren't any todos today.</p>
        )}
      </div>
    </div>
  );
}

export default TodoList;
