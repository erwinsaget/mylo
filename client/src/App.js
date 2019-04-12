import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import PrivateRoute from './components/PrivateRoute';
import fc from './feathersClient';

import './App.css';

class App extends Component {
  state = {
    token: undefined,
    isAuthenticating: true,
    error: null
  }


  componentDidMount() {
    fc.authenticate().catch(() => {
      this.setState({ token: undefined, isAuthenticating: false })
    })

    fc.on('authenticated', response => {
      this.setState({
        token: response,
        isAuthenticating: false,
      })
    })
  }

  handleLogin = (email, password) => {
    fc.authenticate({
      strategy: 'local',
      email,
      password
    }).catch(error => {
      this.setState({ error })
    });
  }

  render() {
    return this.state.isAuthenticating ? '' : (
      <Router>
        <div className="App">
          <Route path="/login" render={(props) => <Login handleLogin={this.handleLogin} token={this.state.token} />} />
          <Route path="/register" render={(props) => <Register handleLogin={this.handleLogin} token={this.state.token} />} />
          <PrivateRoute path="/home" token={this.state.token} component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
