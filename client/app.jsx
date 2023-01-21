import React from 'react';

import jwtDecode from 'jwt-decode';
import Redirect from './components/redirect';
import PageContainer from './components/page-container';
import Header from './components/nav';
import Timeline from './pages/timeline';
import IonDate from '../client/components/date-time-picker';
import AddForm from './pages/add-form';
import HomeBase from './pages/home';

import AppContext from './lib/app-context';
import AuthPage from './pages/auth';
import EditForm from '../client/components/edit-modal';
import { parseRoute } from './lib';
import DeleteModal from '../client/components/delete';
import AllPhotos from './pages/viewphoto';
import ViewAllImages from '../client/components/viewimg';
import MyCalendar from '../client/components/calendar-tiles';
import LoadUser from '../client/components/load-users';
import ViewCalendar from './pages/viewcalendar';

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
    return <Redirect to= 'timeline' />;
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

    if (route.path === 'calendar') {
      return <MyCalendar />;
    }
    if (route.path === 'edit') {
      const eventId = route.params.get('eventId');

      return <EditForm eventId={eventId} />;
    }
    if (route.path === 'delete') {
      const eventId = route.params.get('eventId');
      return <DeleteModal eventId={eventId} />;
    }
    if (route.path === 'viewphoto') {
      const eventId = route.params.get('eventId');
      return <AllPhotos eventId={eventId}/>;
    }
    if (route.path === 'allphotos') {
      return <ViewAllImages />;
    }
    if (route.path === 'allusers') {
      const eventId = route.params.get('eventId');
      return <LoadUser eventId={eventId}/>;
    }
    if (route.path === 'schedule-event') {
      return <ViewCalendar />;
    }
    if (route.path === 'ion-date') {
      return <IonDate />;
    }

  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route, token } = this.state;
    const { handleSignIn, handleSignOut } = this;

    const contextValue = { user, route, handleSignIn, handleSignOut, token };
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
