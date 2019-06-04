import React from 'react';

import './Home.css';

function Home() {
  return (
    <div className="home-screen">
      <div className="sidebar">
        <img src="/images/mylo_logo-01.png" height="225" alt="brand logo" />
        <div className="nav">
          <a href="lkdj">add new</a>
          <a href="lkdj">upcoming</a>
          <a href="lkdj">rewards</a>
          <a href="lkdj">collaborations</a>
          <a href="lkdj">pomodoro</a>
        </div>
      </div>
      <main className="name">main</main>
    </div>
  );
}

export default Home;
