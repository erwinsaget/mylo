import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Home from './Home';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: null,
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleLogin(this.state.email, this.state.password)
  }

  render() {
    return (
      this.props.token ?
        ( <Redirect to="/home" component={Home} /> )
        :
      (<form>
        <div className="formRow">
          <label htmlFor="email">Email</label>
          <input className="formInput" id="email" name="email" type="text" placeholder="email" required onChange={this.handleInput} />
        </div>
        <br></br>
        <div className="formRow">
          <label htmlFor="password">Password</label>
          <input className="formInput" id="password" type="password" name="password" placeholder="password" required onChange={this.handleInput} />
        </div>
        <br></br>
        <div className="formRow">
          <button className="formBtn" onClick={this.handleSubmit}>Login</button>
        </div>
      </form>)
    )
  }
}

export default Login
