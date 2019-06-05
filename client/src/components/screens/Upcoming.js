import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ScreenTitle from '../ui/ScreenTitle';
import { ReactComponent as RightArrow } from '../../assets/arrow-right.svg';
import { ReactComponent as LeftArrow } from '../../assets/arrow-left.svg';
import {
  addMonths,
  subMonths,
  format,
  getDaysInMonth,
  getMonth
} from 'date-fns';

import './Upcoming.css';

function DayView(props) {
  const { day } = props;
  const [redirectToDayView, setRedirectToDayView] = useState(false);

  if (redirectToDayView === true) {
    console.log('the date is ', day.date, 'inside of dayview');

    return <Redirect to={`/h/todos/${day.date}`} />;
  }

  return (
    <div
      className="dayView"
      onClick={() => {
        setRedirectToDayView(true);
      }}
    >
      {day.monthIndex}
    </div>
  );
}

function Upcoming() {
  const [date, setDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState(0);

  useEffect(() => {
    const days = getDaysInMonth(date);

    setDaysInMonth(days);
  }, [date]);

  const createDays = numberOfDays => {
    const dayCircles = [];

    for (let i = 0; i < numberOfDays; i++) {
      dayCircles.push({ date: format(date, 'MM-DD-YYYY'), monthIndex: i + 1 });
    }

    return dayCircles;
  };

  return (
    <div className="upcoming-screen">
      <ScreenTitle>
        <div className="title">
          <button
            className="titleButton"
            onClick={() => setDate(subMonths(date, 1))}
          >
            <LeftArrow />
          </button>
          {format(date, 'MMMM YYYY')}
          <button
            className="titleButton"
            onClick={() => setDate(addMonths(date, 1))}
          >
            <RightArrow />
          </button>
        </div>
      </ScreenTitle>
      <div className="upcoming-list">
        {createDays(daysInMonth).map(day => (
          <DayView key={`day-${day.monthIndex}`} day={day} />
        ))}
      </div>
    </div>
  );
}

export default Upcoming;
