import React from 'react';
import { Link } from 'react-router-dom';

function NoMatch() {
  return (
    <div>
      Couldn't find what you're looking for.
      <Link to="/h"> Wanna head back home?</Link>
    </div>
  );
}

export default NoMatch;
