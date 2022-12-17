import React from 'react';
import SignIn from '../components/signin';

import SignUp from '../components/signup';

export default class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'sign-in'
    };
    this.toggleSign = this.toggleSign.bind(this);
  }

  toggleMode() {
    const action = this.state.isOn === 'login' ? 'sign-up' : 'login';
    this.setState({ isOn: action });
  }

  toggleSign(route) {
    if (route === 'sign-in') {
      this.setState({
        currentPage: 'sign-in',
        welcomeMessage: 'Welcome Back!',
        href: '#sign-up'
      });
    } else {
      this.setState({
        currentPage: 'sign-up',
        welcomeMessage: 'Sign up',
        href: '#sign-in'
      });
    }
  }

  render() {

    return (
      <div>
        <div className="container">
          <div className="form-block-wrapper" />
          <section className="form-block-wrapper">

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
          </section>
        </div>
      </div>
    );
  }
}
