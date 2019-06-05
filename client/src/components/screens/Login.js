import React from 'react';

class Login extends React.Component {
  render() {
    const { email, password } = this.state;
    const { loggedIn } = this.props;

    return loggedIn ? (
      <Redirect to="/h" />
    ) : (
      <form>
        {this.state.error && <div>{this.state.error.message}</div>}
        <label>Email</label>
        <input
          data-testid="email"
          value={email}
          type="text"
          name="email"
          onChange={handleInput.bind(this)}
          placeholder="Email Address"
        />
        <label>Password</label>
        <input
          data-testid="password"
          value={password}
          name="password"
          onChange={handleInput.bind(this)}
          type="password"
          placeholder="Password"
        />

        <button data-testid="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
}

Login.defaultProps = {
  login: null
};

export default Login;
