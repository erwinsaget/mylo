import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <div className="home-container">
          <img className="logo" src="/mylo_logo.png" alt="Mylo Logo" />
        </div>
        <form className="add-todo">
          <input className="home-input rounded-full" />
          <button className="rounded-full home-button">Add Task</button>
        </form>
      </div>
    )
  }
}

export default Home
