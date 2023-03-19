import React, { useState, useEffect } from 'react';

function EventCreatedAt() {
  const [timeSinceCreated, setTimeSinceCreated] = useState({ days: '', hours: '' });

  useEffect(() => {
    fetch('/api/events/createdAt')
      .then(response => response.json())
      .then(data => {
        setTimeSinceCreated(getDaysAndHoursSinceCreated(data[0].createdAt));
      })
      .catch(error => console.error(error));
  }, []);

  function getDaysAndHoursSinceCreated(createdAt) {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const diffInMs = now.getTime() - createdAtDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return { days: diffInDays, hours: diffInHours };
  }

  return (

    <span>{timeSinceCreated.days} days, {timeSinceCreated.hours} hours</span>

  );
}

export default EventCreatedAt;
