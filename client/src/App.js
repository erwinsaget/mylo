import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import Home from './components/screens/Home';
import NoMatch from './components/screens/NoMatch';
import Settings from './components/screens/Settings'
import PrivateRoute from './components/auth/PrivateRoute';
import client from './feathers';
import './App.css';

// TODO: handle redirect from / to /login

class App extends React.Component {
  state = {
    login: undefined
  }

  componentDidMount() {
    client.authenticate().catch(() => this.setState(() => {
      return { login: null }
    }))

    client.on('authenticated', login => {
      this.setState({ login })
    })

    client.on('logout', () => {
      this.setState({ login: null })
    })
  }

  render() {
    const { login } = this.state;

    if (login === undefined) {
      return (<div>Loading...</div>)
    }

    return (
      <Router>
        <Switch>
          <Route path="/login" render={() => <Login loggedIn={login} />} />
          <Route path="/register" render={() => <Register loggedIn={login} />} />
          <PrivateRoute login={this.state.login} path="/home" component={Home} />
          <PrivateRoute login={this.state.login} path="/settings" component={Settings} />
          <Redirect from='/' to='/home' />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
