import React from 'react';
import { Redirect } from 'react-router-dom';
import { handleInput } from '../utils';
import client from '../../feathers';
import './SignIn.css';

const users = client.service('users');

class SignIn extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    error: undefined,
    containerClasses: 'container',
    loading: false
  };

  showRightPanel = () => {
    this.setState({
      containerClasses: 'container right-panel-active'
    });
  };

  showLeftPanel = () => {
    this.setState({
      containerClasses: 'container'
    });
  };

  handleLogin = event => {
    event.preventDefault();

    const { email, password } = this.state;

    client
      .authenticate({
        strategy: 'local',
        email,
        password
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  handleRegistration = event => {
    event.preventDefault();

    const { name, email, password } = this.state;

    users
      .create({
        name,
        email,
        password
      })
      .then(() => this.handleLogin(event))
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { name, email, password, containerClasses } = this.state;
    const { loggedIn } = this.props;

    return loggedIn ? (
      <Redirect to="/h" />
    ) : (
      <div className="layout">
        <div className={containerClasses} id="container">
          <div className="form-container sign-up-container">
            <form>
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
              <span>or use your email for registration</span>
              {this.state.error && <div>{this.state.error.message}</div>}
              <input
                name="name"
                value={name}
                onChange={handleInput.bind(this)}
                type="text"
                placeholder="Name"
              />
              <input
                name="email"
                value={email}
                onChange={handleInput.bind(this)}
                type="email"
                placeholder="Email"
              />
              <input
                name="password"
                value={password}
                onChange={handleInput.bind(this)}
                type="password"
                placeholder="Password"
              />
              <button onClick={this.handleRegistration}>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g" />
                </a>
                <a href="#" className="social">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
              <span>or use your account</span>
              {this.state.error && <div>{this.state.error.message}</div>}
              <input
                onChange={handleInput.bind(this)}
                name="email"
                value={email}
                type="email"
                placeholder="Email"
              />
              <input
                onChange={handleInput.bind(this)}
                name="password"
                value={password}
                type="password"
                placeholder="Password"
              />
              <a href="#">Forgot your password?</a>
              <button onClick={this.handleLogin}>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={this.showLeftPanel}
                  className="ghost"
                  id="signIn"
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Join Mylo</h1>
                <p>Enter your personal details and start organizing today!</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={this.showRightPanel}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
