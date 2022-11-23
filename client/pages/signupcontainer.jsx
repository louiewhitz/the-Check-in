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
    // console.log('this.state:', this.state);
    return (
      <div>
        <div className="container">
          <div className="form-block-wrapper" />
          <section className="form-block-wrapper">
            {/* <header className="form-block__header">
              <h1 className="text-white">
                {this.state.currentPage === 'sign-up'
                  ? 'Sign up'
                  : 'Welcome Back'}
              </h1>

              <div className="form-block__toggle-block">
                <span>
                  {this.state.currentPage === 'sign-up' ? 'Already' : "Don't"}{' '}
                  have an account? Click here &#8594;
                </span>
                <a
                  href={
                    this.state.currentPage === 'sign-up'
                      ? '#sign-in'
                      : '#sign-up'
                  }
                  id="form-toggler"
                  onClick={this.toggleMode.bind(this)}
                  className="toggle-button"
                />
                {this.state.currentPage === 'sign-up' ? 'login' : 'Register'}
                <label htmlFor="form-toggler" className="circle" />
              </div>
            </header> */}
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
