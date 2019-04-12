import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Home from './Home';
import fc from '../../feathersClient';

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    loading: false,
    error: null,
  };

  handleInput = e => {
    this.setState({ [e.target.name] : e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ loading: true });

    fc.service('users').create({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
    .then(() => this.props.handleLogin(this.state.email, this.state.password))
    .catch((err) => {
      this.setState({ error: err, loading: false });
    })
  }

  render() {
    return (
      this.props.token ?
        ( <Redirect to="/home" component={Home} /> )
        :
        (<div>
          <p>Register</p>

          <form>
            <input placeholder="Full Name" name="name" onChange={this.handleInput} />
            <input placeholder="Email" name="email" onChange={this.handleInput} />
            <input placeholder="Password" name="password" onChange={this.handleInput} />
            <button onClick={this.handleSubmit}>Sign Up</button>
          </form>

          {this.state.loading ? (<span>Loading</span>) : "" }
        </div>)
    )
  }
}

export default Register
