import React from 'react';

import './ScreenTitle.css';

function ScreenTitle(props) {
  const { title } = props;

  if (!title) throw new Error('No title was provided');

  return <h2 className="title">{title}</h2>;
}

export default ScreenTitle;
