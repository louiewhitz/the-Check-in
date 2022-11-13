import React from 'react';
import { IoAddCircle, IoCalendarSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

// const style = { color: 'white', fontSize: '1.5em' };
export default function Add(props) {
  return (
    <div className="container">
      <div className="row d-flex justify-content-evenly">
        <div className="col text-end">
          <Link to="/addevent">
            <IoAddCircle size={200} style={{ fill: 'greenyellow' }} />
          </Link>
        </div>
        <div className="col text-start">
          <Link to="/schedule">
            <IoCalendarSharp size={200} style={{ fill: 'purple' }} />
          </Link>
        </div>
      </div>
    </div>
  );
}
