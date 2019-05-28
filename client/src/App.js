import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/screens/Login';
import Register from './components/screens/Register';
import Home from './components/screens/Home';
import NoMatch from './components/screens/NoMatch';
import Settings from './components/screens/Settings'
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
    if (this.state.login === undefined) {
      return (<div>Loading...</div>)
    }

    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/settings" component={Settings} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
