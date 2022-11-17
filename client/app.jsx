import React from 'react';
import Calendar from './pages/calendar';
import jsonwebtoken from 'jsonwebtoken';
// import Home from './pages/home';
// import SchedulePage from './pages/schedule-page';
import Header from './components/nav';
import SignUp from './components/signup';
import SignUpContainer from './pages/signupcontainer';
// import AddEvent from './pages/Add';
import Timeline from './pages/timeline';
// import Auth from '../components/auth-form';
import DatePicker from './pages/datepicker';
import AddForm from './pages/sendCompletedForm';
import HomeBase from './components/hello-world';
import Notes from './pages/notes';
import SignIn from './components/signin';
import AppContext from './lib/app-context';

import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    // this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const newRoute = window.location.hash;
      const parsedRoute = parseRoute(newRoute);

      this.setState({ route: parsedRoute });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? jsonwebtoken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <HomeBase />;
    }
    if (route.path === 'sign-in' || route.path === 'sign-up') {
      return <SignUpContainer />;
    }

    if (route.path === '') {
      return <HomeBase />;
    }
    if (route.path === 'addform') {
      return <AddForm />;
    }
    if (route.path === 'timeline') {
      return <Timeline />;
    }
    if (route.path === 'scheduling') {
      return <DatePicker />;
    }
    if (route.path === 'sign-in') {
      return <SignIn />;
    }
    if (route.path === 'notes') {
      return <Notes />;
    }
    if (route.path === 'calendar') {
      return <Calendar />;
    }
    if (route.path === 'sign-up') {
      return <SignUp />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut }; // should this not be this.state.user, etc?
    return (
      <AppContext.Provider value={contextValue}>
        <Header />
        {this.renderPage()}
      </AppContext.Provider>
    );
  }
}
