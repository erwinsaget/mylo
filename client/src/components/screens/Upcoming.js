import React from 'react';
import ScreenTitle from '../ui/ScreenTitle';

import './Upcoming.css';

function Upcoming() {
  const today = new Date();
  const date = today.toDateString();
  return (
    <div className="upcoming-screen">
      <ScreenTitle title={date} />
      <div className="todo-list">todos list</div>
    </div>
  );
}

export default Upcoming;
