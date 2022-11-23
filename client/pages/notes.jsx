import React, { useContext } from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

const Notes = () => {
  const { user } = useContext(AppContext);

  if (!user) {
    return <Redirect to="#sign-in" />;
  }

  return (
    <div className='container'><h1 className='text-white'>Hello</h1></div>
  );
};

export default Notes;
