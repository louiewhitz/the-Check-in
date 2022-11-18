import React from 'react';
import Calendar from './pages/calendar';
import jwtDecode from 'jwt-decode';
import Redirect from './lib/redirect';
import PageContainer from './components/page-container';

// import SchedulePage from './pages/schedule-page';
import Header from './components/nav';
import SignUp from './components/signup';

// import AddEvent from './pages/Add';
import Timeline from './pages/timeline';

import ScheduleMe from './pages/datepicker';
import AddForm from './pages/sendCompletedForm';
import HomeBase from './components/hello-world';
import Notes from './pages/notes';
import SignIn from './components/signin';
import AppContext from './lib/app-context';
import AuthPage from './pages/auth-form';
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
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
    return <Redirect to="timeline" />;
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
    window.location.hash = 'sign-in';
    return <Redirect to="sign-in" />;
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <HomeBase />;
    }
    // if (route.path === 'sign-in' || route.path === 'sign-up') {
    //   return <AuthPage />;
    // }

    if (route.path === 'addform') {
      return <AddForm />;
    }
    if (route.path === 'timeline') {
      return <Timeline />;
    }
    if (route.path === 'scheduling') {
      return <ScheduleMe />;
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
        <>
          <Header />
          <PageContainer>{this.renderPage()}</PageContainer>
        </>
      </AppContext.Provider>
    );
  }
}
