import React from 'react';
import { Link } from 'react-router-dom';
import { IoCameraSharp } from 'react-icons/io5';

const Timeline = () => (
  <div className="container">
    <h3>timeline</h3>
    <Link to="/viewphoto"><IoCameraSharp size={100} style={{ fill: 'pink' }}/></Link>
  </div>
);

export default Timeline;
