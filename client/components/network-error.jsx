import React from 'react';
import AppContext from '../lib/app-context';

export default function NetError(props) {
  const errorMessage = props.eventId !== undefined
    ? `This event with eventId ${props.eventId} not found. Please enter a valid eventId, then refresh your browser.`
    : 'This might be a connection issue, please check your internet and refresh.';
  return (
    <div className='row d-flex align-items-center justify-content-center p-2 bd-highlight'>
      <h2 className='no-events'>A Network Error has occured </h2>
      <h4 className='no-events'>{errorMessage}</h4>
    </div>
  );
}
NetError.contextType = AppContext;
