import React from 'react';

import SignIn from '../components/signin';
import SignUp from '../components/signup';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'sign-in'
    };
    this.toggleSign = this.toggleSign.bind(this);
  }

  toggleSign(route) {
    if (route === 'sign-in') {
      this.setState({
        currentPage: 'sign-in'
      });
    } else {
      this.setState({
        currentPage: 'sign-up'
      });
    }
  }

  render() {
    return (
      <div className="container-md mx-auto">
        <div className="row d-flex justify-content-center align-items-center flex-wrap">
          <div className="col d-flex d-inline-flex align-self-center">
            <div>
              {this.state.currentPage === 'sign-up'
                ? (
                  <SignUp />
                  )
                : this.state.currentPage === 'sign-in'
                  ? (
                    <SignIn />
                    )
                  : null}
            </div>
          </div>
          <div className="col-sm" />
        </div>
      </div>
    );
  }
}
