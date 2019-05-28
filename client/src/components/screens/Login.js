import React from 'react';
import { Redirect } from 'react-router-dom';
import { handleInput } from '../utils'
import client from '../../feathers'

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: undefined
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state

    client.authenticate({
      strategy: 'local',
      email,
      password
    }).catch(error => {
      this.setState({ error })
    })
  }

  render() {
    const { email, password } = this.state;
    const { loggedIn } = this.props;

    return loggedIn ?  (
      <Redirect to="/home" />
    ) : (
      <form>
        {this.state.error && (
          <div>{this.state.error.message}</div>
        )}
        <label>Email</label>
        <input
          value={email}
          type="text"
          name="email"
          onChange={handleInput.bind(this)}
          placeholder="Email Address" />
        <label>Password</label>
        <input
          value={password}
          name="password"
          onChange={handleInput.bind(this)}
          type="password"
          placeholder="Password" />

        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

export default Login;
