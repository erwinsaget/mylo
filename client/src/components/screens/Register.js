import React from 'react';
import { Redirect } from 'react-router-dom';
import { handleInput } from '../utils';
import client from '../../feathers';

const users = client.service('users');

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: undefined
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, password } = this.state;

    users.create({
      name, email, password
    }).then(response => {
      client.authenticate({
        strategy: 'local',
        email,
        password
      })
    }).catch(error => {
      this.setState({ error })
    })
  }

  render() {
    const { name, email, password } = this.state;
    const { loggedIn } = this.props;

    return loggedIn ? (
      <Redirect to="/home" />
    ) : (
      <div>
        Register
      <form>
          <input
            value={name}
            type="text"
            name="name"
            onChange={handleInput.bind(this)}
            placeholder="Full Name" />

          <input
            value={email}
            type="text"
            name="email"
            onChange={handleInput.bind(this)}
            placeholder="Email Address" />

          <input
            value={password}
            name="password"
            onChange={handleInput.bind(this)}
            type="password"
            placeholder="Password" />

          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Register;

