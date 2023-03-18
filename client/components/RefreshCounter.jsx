import React, { useState } from 'react';
import AddForm from '../pages/add-form';
import EventCreatedAt from './counter';

function Refresh() {
  const [refreshCount, setRefreshCount] = useState(0);

  function handleEventAdded() {
    setRefreshCount(count => count + 1);
  }

  return (
    <div>
      <EventCreatedAt key={refreshCount} />
      <AddForm onEventAdded={handleEventAdded} />
    </div>
  );
}

export default Refresh;
