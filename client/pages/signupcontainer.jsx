import React from 'react';
import SignIn from '../components/signin';
import AppContext from '../lib/app-context';
import SignUp from '../components/signup';
import Redirect from '../lib/redirect'; // can use this 'https://v5.reactrouter.com/web/api/Redirect'

export default class SignUpContainer extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;
    // console.log('this.context Auth', this.context);

    if (user) return <Redirect to="" />; /// <<< thats the redirect

    const welcomeMessage =
      route.path === 'sign-in' ? 'Welcome back!' : 'Sign up';
    // can use this 'https://v5.reactrouter.com/web/api/Redirect'

    return (
      <div>
        <div className="form-block-wrapper" />
        <section className="form-block form-bl">
          <header className="form-block__header">
            <h1>{welcomeMessage}</h1>
            <div className="form-block__toggle-block">
              <label htmlFor="form-toggler" className="circle" />
            </div>
          </header>
          <LoginForm mode={this.state.action} onSubmit={this.props.action} />
        </section>
      </div>
    );
  }
}

SignUpContainer.contextType = AppContext;

/* <AuthForm
              key={route.path}
              action={route.path}
              onSignIn={handleSignIn} />
          </div> */

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: this.props.action };
  }

  render() {
    console.log('state', this.state);
    console.log('props', this.props);

    return <SignIn />;
  }
}
