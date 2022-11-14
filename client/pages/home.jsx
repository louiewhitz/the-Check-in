import React from 'react';
import Add from '../components/hello-world';

export default function Home(props) {
  return (
    <div className="container">
      <p className="text-white text-center me-4">Add your first event,</p>
      <p className="text-white text-center ms-5">get the ball rolling</p>
      <Add />
    </div>
  );
}
