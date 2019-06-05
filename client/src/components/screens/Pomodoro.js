import React from 'react';
import ScreenTitle from '../ui/ScreenTitle';
import './Pomodoro.css';

function Pomodoro() {
  return (
    <div className="pomodoro-screen">
      <ScreenTitle title="pomodoro zone" />
      <div className="pomodoro-circle">
        <p className="pomodoro-text">Soon</p>
      </div>
    </div>
  );
}

export default Pomodoro;
