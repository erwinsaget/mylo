import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Collaborations from './Collaborations';
import Rewards from './Rewards';
import Pomodoro from './Pomodoro';
import Upcoming from './Upcoming';
import TodoList from './TodoList';
import CreateTodo from './CreateTodo';
import './Home.css';

function Home() {
  return (
    <div className="home-screen">
      <div className="sidebar">
        <img src="/images/mylo_logo-01.png" height="225" alt="brand logo" />
        <div className="nav">
          <NavLink activeClassName="active" to="/h/new">
            add new
          </NavLink>
          <NavLink activeClassName="active" to="/h/upcoming">
            upcoming
          </NavLink>
          <NavLink activeClassName="active" to="/h/rewards">
            rewards
          </NavLink>
          <NavLink activeClassName="active" to="/h/collaborations">
            collaborations
          </NavLink>
          <NavLink activeClassName="active" to="/h/pomodoro">
            pomodoro
          </NavLink>
        </div>
      </div>
      <main className="main">
        <Route exact path="/h" component={TodoList} />
        <Route exact path="/h/new" component={CreateTodo} />
        <Route exact path="/h/collaborations" component={Collaborations} />
        <Route exact path="/h/rewards" component={Rewards} />
        <Route exact path="/h/pomodoro" component={Pomodoro} />
        <Route exact path="/h/upcoming" component={Upcoming} />
      </main>
    </div>
  );
}

export default Home;
