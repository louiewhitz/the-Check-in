import React from 'react';
import LoadingSpinner from '../components/loading-spinner';
import NetErr from '../components/network-error';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      signInWasInvalid: false,
      networkError: false,
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signedIn = this.signedIn.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  resetState() {
    this.setState({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      signInWasInvalid: false,
      networkError: false,
      loading: false

    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'sign-up') {
          this.resetState();
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.resetState();
          this.props.onSignIn(result);
          window.location.hash = '';

        } else {
          this.setState({ signInWasInvalid: true, loading: false });
        }
      })
      .catch(error => {
        console.error('Sorry, error', error);
        this.setState({ networkError: true, loading: false });
      });
  }

  signedIn(event) {
    this.setState({ username: 'Welcome', password: '123456', firstName: 'Sample', lastName: 'User' });
    event.preventDefault();
  }

  render() {
    const { action } = this.props;
    const { handleChange, handleSubmit, signedIn } = this;
    const { firstName, lastName, username, password, signInWasInvalid, loading, networkError } = this.state;
    const alternateActionHref = action === 'sign-up' ? '#sign-in' : '#sign-up';
    const alternatActionText =
      action === 'sign-up' ? 'Sign in instead' : 'Register now';
    const submitButtonText = action === 'sign-up' ? 'Register' : 'Log In';
    const invalidSignIn = signInWasInvalid
      ? <p className="text-dark">Invalid username or password</p>
      : '';
    const networkErrorMsg = networkError
      ? <NetErr />
      : '';
    const loadingSpinner = loading === true
      ? <LoadingSpinner />
      : '';
    return (
      <form className="w-100" onSubmit={handleSubmit}>
        {action === 'sign-up'
          ? (
            <>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                required
                autoFocus
                id="firstName"
                type="text"
                name="firstName"
                onChange={handleChange}
                value={firstName}
                className="form-control bg-transparent"
              />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                required
                autoFocus
                id="lastName"
                type="text"
                name="lastName"
                onChange={handleChange}
                value={lastName}
                className="form-control bg-light"
              />
              </div>
            </>
            )
          : null}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            required
            autoFocus
            id="username"
            type="text"
            name="username"
            onChange={handleChange}
            value={username}
            className="form-control bg-light"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            required
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
            className="form-control bg-light"
          />
        </div>
        {invalidSignIn}
        {networkErrorMsg}
        <div className="d-flex justify-content-between align-items-center">
          <small>
            <a className="text-muted" href={alternateActionHref}>
              {alternatActionText}
            </a>
          </small>
          <div>
            <button type="submit" className="btn btn-primary">
              {submitButtonText}
            </button>
            <button type="button" className="btn btn-success" onClick={signedIn}>
              Click to try!
            </button>
          </div>
        </div>
        {loadingSpinner}
      </form>
    );
  }
}
