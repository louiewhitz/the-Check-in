import React, { useState, useEffect } from 'react';

function EventCreatedAt() {
  const [daysSinceCreated, setDaysSinceCreated] = useState('');

  useEffect(() => {
    fetch('/api/events/createdAt')
      .then(response => response.json())
      .then(data => {
        setDaysSinceCreated(getDaysSinceCreated(data[0].createdAt));
      })
      .catch(error => console.error(error));
  }, []);

  function getDaysSinceCreated(createdAt) {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const diffInMs = now.getTime() - createdAtDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return Math.floor(diffInDays);
  }

  return (
    <div>
      <p className='timer'>{daysSinceCreated}</p>
    </div>
  );
}

export default EventCreatedAt;
