import React from 'react';
import { IoAddCircle, IoCalendarSharp } from 'react-icons/io5';

export default function HomeBase(props) {
  return (
    <div className="container">
      <div className="container">
        <p className="text-white text-center me-4">Add your event,</p>
        <p className="text-white text-center ms-5">get the ball rolling</p>
      </div>
      ;
      <div className="row d-flex justify-content-evenly">
        <div className="col text-end">
          <a href="#addform">
            <IoAddCircle size={200} style={{ fill: 'greenyellow' }} />
          </a>
        </div>
        <div className="col text-start">
          <a href='#scheduling'>
            <IoCalendarSharp size={200} style={{ fill: 'purple' }} />
          </a>
        </div>
      </div>
    </div>
  );
}
