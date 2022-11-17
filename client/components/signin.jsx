import React from 'react';
import Redirect from '../lib/redirect';
import AppContext from '../lib/app-context';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleMode() {
    const action = this.state.isOn === 'login' ? 'sign-up' : 'login';
    this.setState({ isOn: action });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    // console.log('this.state', this.state);
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
          window.location.hash = 'sign-in';
        } else if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  render() {
    const user = this.context.user;

    if (user) return <Redirect to="#" />;

    const { action } = this.props;
    const { handleChange, handleSubmit } = this;
    const alternateActionHref = action === 'sign-up' ? '#sign-in' : '#sign-up';
    const alternatActionText =
      action === 'sign-up' ? 'Sign in instead' : 'Register now';

    const submitButtonText = action === 'sign-up' ? 'Register' : 'Log In';

    return (
      <div>
        <div className="form-block-wrapper" />
        <section className="form-block">
          <header className="form-block__header">
            <h1>{alternatActionText}</h1>
            <div className="form-block__toggle-block">
              <span>
                {alternatActionText === 'sign-up' ? "don't" : 'Already'} have an
                account? Click here &#8594;
              </span>
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

          <form>
            <div className="form-group" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col form-group pt-2">
                  <label htmlFor="other" className="d-block fs-5 form-label">
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
                  <label htmlFor="other" className="d-block fs-5 form-label">
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
            </div>
          </form>
        </section>
      </div>
    );
  }
}
SignIn.contextType = AppContext;
