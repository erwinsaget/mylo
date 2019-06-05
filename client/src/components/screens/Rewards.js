import React, { useState, useEffect } from 'react';
import ScreenTitle from '../ui/ScreenTitle';
import client from '../../feathers';

import './Rewards.css';

function Rewards(props) {
  const { userId } = props;
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      const result = await client
        .service('users')
        .get(userId, { query: { $select: ['points'] } });

      setPoints(result.points);
    };

    fetchPoints();
  });

  return (
    <div className="rewards-screen">
      <ScreenTitle title="rewards" />
      <div className="rewards-circle">
        <p className="rewards-points">{points}</p>
        <p className="rewards-text">points</p>
      </div>
    </div>
  );
}

export default Rewards;
