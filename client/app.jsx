import React from 'react';
import Calendar from './pages/calendar';
import jwtDecode from 'jwt-decode';
import Redirect from './components/redirect';
import PageContainer from './components/page-container';
import Header from './components/nav';
import Timeline from './pages/timeline';
import ScheduleMe from './pages/datepicker';
import AddForm from './pages/add-form';
import HomeBase from './pages/home';
import Notes from './pages/notes';
import AppContext from './lib/app-context';
import AuthPage from './pages/auth';
import UpdateForm from './components/delete-and-edit';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const newRoute = window.location.hash;
      const parsedRoute = parseRoute(newRoute);

      this.setState({ route: parsedRoute });
    });
    const token = window.localStorage.getItem('auth-token');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('auth-token', token);
    this.setState({ user });
    return <Redirect to="timeline" />;
  }

  handleSignOut() {
    window.localStorage.removeItem('auth-token');
    this.setState({ user: null });
    window.location.hash = 'sign-in';
    return <Redirect to="sign-in" />;
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <HomeBase />;
    }
    if (route.path === 'sign-in' || route.path === 'sign-up') {
      return <AuthPage />;
    }
    if (route.path === 'addform') {
      return <AddForm />;
    }
    if (route.path === 'timeline') {
      return <Timeline />;
    }
    if (route.path === 'scheduling') {
      return <ScheduleMe />;
    }
    if (route.path === 'notes') {
      return <Notes />;
    }
    if (route.path === 'calendar') {
      return <Calendar />;
    }
    if (route.path === 'edit') {
      return <UpdateForm />;
    }
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
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
