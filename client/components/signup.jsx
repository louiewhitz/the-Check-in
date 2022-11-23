/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import AppContext from '../lib/app-context';
// import Redirect from '../lib/redirect';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  toggleMode() {
    const action = this.state.isOn === 'login' ? 'sign-up' : 'login';
    this.setState({ isOn: action });
  }

  handleSubmit(event) {
    // console.log('state:', this.state);
    // console.log('submit props', this.props);
    event.preventDefault();

    // axios is used for an api call
    axios
      .post('/api/auth/sign-up', {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      })
      .then(res => {
        // console.log('res.data:', res.data);
        // this.context.props(res.data);

        this.setState({ username: '', password: '' });
      })
      .then(() => {
        window.location.hash = '#';
      })

      .catch(err => {
        console.log('res.err:', err);
      });
  }

  render() {
    console.log('this.state', this.state);
    console.log('prpos in render', this.props);

    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const alternateActionHref = '#sign-in';
    const alternatActionText =
      action === 'sign-up' ? 'Sign in instead' : 'Register now';
    const submitButtonText = action === 'sign-up' ? 'Register' : 'Log In';

    return (
      <div>
        <div className="form-block-wrapper" />
        <section className="form-block">
          <header className="form-block__header">
            <h1 className="text-white">Sign up</h1>
            <div className="form-block__toggle-block">
              <span>Already have an account? account? Click here &#8594;</span>
              <a
                href={alternateActionHref}
                id="form-toggler"
                onClick={this.toggleMode.bind(this)}
                className="toggle-button">
                {alternatActionText}
              </a>
              <label htmlFor="form-toggler" className="circle" />
            </div>
          </header>
          <form className="container-md mx-auto" onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="row">
                <div className="col form-group pt-2">
                  <label
                    htmlFor="firstName"
                    className="d-block fs-5 form-label">
                    First Name
                  </label>
                  <input
                    required
                    autoFocus
                    id="firstname"
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    placeholder="firstname"
                    className="form-control rounded mt-3 bg-transparent px-4 py-2.5 text-light"
                  />
                </div>
                <div className="col form-group pt-2">
                  <label htmlFor="lastName" className="d-block fs-5 form-label">
                    Last Name
                  </label>
                  <input
                    required
                    autoFocus
                    id="lastName"
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    placeholder="lastName"
                    className="form-control rounded mt-3 bg-transparent px-4 py-2.5 text-light"
                  />
                </div>
              </div>
              <div className="col form-group pt-2">
                <label htmlFor="username" className="d-block fs-5 form-label">
                  Username
                </label>
                <input
                  required
                  autoFocus
                  id="username"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder="Username"
                  className="form-control rounded mt-3 bg-transparent px-4 py-2.5 text-light"
                />
              </div>
              <div className="col form-group pt-2">
                <label htmlFor="password" className="d-block fs-5 form-label">
                  Password
                </label>
                <input
                  required
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  className="form-control rounded mt-3 bg-transparent px-4 py-2.5 text-light"
                />
              </div>

              <div className="d-flex justify-content-end">
                <button className="btn btn-primary btn-sm mt-2" type="submit">
                  {submitButtonText}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    );
  }
}
SignUp.contextType = AppContext;
