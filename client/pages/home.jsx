import React from 'react';
import Add from '../components/hello-world';
import SignIn from '../components/signin';
import SignUpContainer from './signupcontainer';

export default function Home(props) {
  // constructor(props);
  // super(props) {
  //   this.state = {
  //     currentPage: 'sign-in'
  //   }
  //   this.changePage = this.changePage.bind(this)
  // }
  return (
    <div className="container">
      <p className="text-white text-center me-4">Add your first event,</p>
      <p className="text-white text-center ms-5">get the ball rolling</p>
      <Add />
    </div>
  );
}
