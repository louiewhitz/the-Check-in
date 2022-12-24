/* eslint-disable no-unused-vars */
import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import { IoAddCircle, IoCalendarSharp, IoCamera } from 'react-icons/io5';
import { format } from 'date-fns';
import EventType from '../components/eventtypes';
import EditForm from '../components/edit-modal';
import DeleteModal from '../components/delete';
import AllPhotos from './viewphoto';
import { Button } from 'react-bootstrap';
import NetError from '../components/network-error';
import LoadingSpinner from '../components/loading-spinner';
import Axios from 'axios';
import LoadUser from '../components/load-users';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      username: [],
      loading: true,
      networkError: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.loadEvents = this.loadEvents.bind(this);

  }

  loadEvents() {
    fetch('/api/events', {
      headers: {
        'X-Access-Token': localStorage.getItem('auth-token')
      }
    })
      .then(res => res.json())
      .then(events =>
        this.setState({
          events,
          loading: false
        })
      )
      .catch(err => {
        console.error('Dang, not this time!', err);
        this.setState({ networkError: true });
      });
  }

  componentDidMount() {
    this.loadEvents();

  }

  handleClick(number) {
    this.setState({ eventId: number });
  }

  render() {
    const { user } = this.context;

    if (!user) {
      return <Redirect to="#sign-in" />;
    }

    if (this.state.networkError) {
      return <NetError />;
    }

    if (this.state.loading) {
      return <LoadingSpinner />;
    }

    return this.state.loaing
      ? (<><LoadingSpinner />
        <p className='text-white'>...Please hold on a sec, loading</p>
      </>
        )
      : this.state.entries === 0
        ? (
          <div className="container mt-nav text-white">
            <p>Sorry there are no events yet.</p>
          </div>
          )
        : (
          <div className="container">
            {/* <LoadingSpinner /> */}
            <h1 className="text-center timeline-color">Timeline of Events </h1>
            <div className="row d-flex justify-content-evenly">
              <div className="col text-end">
                <a href="#addform" id="addhref">
                  <IoAddCircle size={150} />
                </a>
              </div>
              <div className="col text-start">
                <a href="#viewcalendar">
                  <IoCalendarSharp size={150} />
                </a>
              </div>
            </div>
            <section id="timeline">
              {this.state.events.map(event => {
                return (
                  <div key={event.eventId}>
                    <AllEvents
                  key={event.eventId}
                  event={event}
                  loadEvents={this.loadEvents}

                />
                  </div>
                );
              })}
            </section>
          </div>
          );
  }
}
function AllEvents(props) {

  const { eventTypeId, title, description, createdAt, eventId, updatedAt, photoUrl, username, userId } =
    props.event;

  const currentUser = props.event.userId;
  const scheduled = new Date(updatedAt);
  const addSched = format(scheduled, 'PPp');

  const momUpdatedAt = moment(updatedAt).format('LLLL');

  const postedOn = new Date(createdAt);
  const handleShow = () => {
    return eventId;
  };

  const post = format(postedOn, 'PPp');

  return (
    <article>
      <div className="inner">
        <EventType eventTypeId={eventTypeId} />
        <h2 className="text-center">
          <span className="thisdate mx-1">{post}</span>
          {title}
          <span className="edit text-muted">
            <DeleteModal
      eventId={eventId}
      event={props.event}
      loadEvents={props.loadEvents}
    />

            <EditForm
      eventId={eventId}
      title={title}
      description={description}
      updatedAt={updatedAt}
      userId={userId}
      loadEvents={props.loadEvents}

    />

            <AllPhotos eventId={eventId} title={title} photoUrl={photoUrl} loadEvents={props.loadEvents} />

          </span>
        </h2>

        <p>{description}<LoadUser eventId={eventId} userId={userId} username={username} loadUsers={props.loadUsers} /></p>
      </div>
    </article>
  );
}

Timeline.contextType = AppContext;
