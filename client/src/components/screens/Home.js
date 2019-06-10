import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import client from '../../feathers';
import Collaborations from './Collaborations';
import Rewards from './Rewards';
import Pomodoro from './Pomodoro';
import Upcoming from './Upcoming';
import Todos from './Todos';
import TodoList from './TodoList';
import CreateTodo from './CreateTodo';
import './Home.css';

function Home(props) {
  const { login, location } = props;
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const result = await client.passport.verifyJWT(login.accessToken);

      const user = await client.service('users').get(result.userId);

      setUserId(result.userId);
      setUser(user);
    };
    fetchUserInfo();
  }, [login]);

  const logout = () => {
    client.logout().then(window.location.replace('/signin'));
  };

  return (
    <div
      className={`home-screen ${
        location.pathname.includes('todolist') ? 'white-bg' : 'purple-bg'
      }`}
    >
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
          <span onClick={logout}>Logout</span>
        </div>
      </div>
      <main className="main">
        <Route exact path="/h/todos/:date?" component={Todos} />
        <Route exact path="/h/new" component={CreateTodo} />
        <Route
          exact
          path="/h/collaborations"
          render={props => <Collaborations user={user} {...props} />}
        />
        <Route
          exact
          path="/h/rewards"
          render={() => <Rewards userId={userId} />}
        />
        <Route exact path="/h/pomodoro" component={Pomodoro} />
        <Route exact path="/h/upcoming" component={Upcoming} />
        <Route
          exact
          path="/h/collaborations/todolist/:id"
          render={props => <TodoList user={user} {...props} />}
        />
      </main>
    </div>
  );
}

export default Home;
