import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/screens/SignIn';
import Home from './components/screens/Home';
import NoMatch from './components/screens/NoMatch';
import PrivateRoute from './components/auth/PrivateRoute';
import client from './feathers';
import './App.css';

class App extends React.Component {
  state = {
    login: undefined,
    containerClasses: ''
  };

  componentDidMount() {
    client.authenticate().catch(() =>
      this.setState(() => {
        return { login: null };
      })
    );

    client.on('authenticated', login => {
      this.setState({ login });
    });

    client.on('logout', () => {
      this.setState({ login: null });
    });
  }

  render() {
    const { login } = this.state;

    if (login === undefined) {
      return <div>Loading...</div>;
    }

    return (
      <Router>
          <Switch>
            <Route path="/signin" render={() => <SignIn loggedIn={login} />} />
            <PrivateRoute login={login} path="/h" component={Home} />
            <Route component={NoMatch} />
          </Switch>
      </Router>
    );
  }
}

export default App;
