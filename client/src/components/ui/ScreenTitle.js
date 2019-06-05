import React from 'react';

import './ScreenTitle.css';

function ScreenTitle(props) {
  const { title, children } = props;

  return children ? children : <h2 className="title">{title}</h2>;
}

export default ScreenTitle;
