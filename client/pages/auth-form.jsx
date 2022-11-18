import React from 'react';
import AppContext from '../lib/app-context';
import SignIn from '../components/signin';
import Redirect from '../lib/redirect';

export default class AuthPage extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="home" />;

    const buttonText = route.path === 'sign-in' ? 'Sign In' : 'Sign Up';
    const alternateActionHref =
      route.path === 'sign-up' ? '#sign-in' : '#sign-up';
    const alternatActionText =
      route.path === 'sign-up' ? 'Login' : 'Register now';
    const message = route.path === 'sign-up' ? 'Already' : 'Dont';

    return (
      <div className="row align-items-center">
        <div className="col-12 offset-0 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-4 offset-xl-4">
          <section className="form-block">
            <header className="form-block__header">
              <h1>{alternatActionText}</h1>
              <div className="form-block__toggle-block">
                <span>{message} have an account? Click here &#8594;</span>
                <a
                  href={alternateActionHref}
                  id="form-toggler"
                  className="toggle-button">
                  {alternatActionText}
                </a>
                <label htmlFor="form-toggler" className="circle" />
              </div>
            </header>
          </section>

          <header className="text-center">
            <h2
              className="sign border-none bg-none"
              type="button"
              value="sign-up">
              {buttonText}
            </h2>
          </header>
          <div className="p-3 ">
            <SignIn
              key={route.path}
              action={route.path}
              onSignIn={handleSignIn}
            />
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;
