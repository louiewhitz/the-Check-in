import React, { useContext } from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

const Calendar = () => {
  const { user } = useContext(AppContext);

  if (!user) {
    return <Redirect to="#sign-in" />;
  }

  return (
    <div className="container">
      <h1 className="text-white">Schedule Me!</h1>
    </div>
  );
};

export default Calendar;
