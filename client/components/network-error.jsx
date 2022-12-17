import React from 'react';

export default function NetError(props) {
  const errorMessage = props.eventId !== undefined
    ? `This event with eventId ${props.eventId} not found. Please enter a valid eventId, then refresh your browser.`
    : 'This might be a connection isse, please check your internet and refresh.';
  return (
    <div className='row d-flex align-items-center justify-content-center p-2 bd-highlight'>
      <h2 className='text-white'>A Network Error has occured </h2>
      <div className='text-white'>{errorMessage}</div>
    </div>
  );
}
