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

            <h1 className="text-center timeline-color">Timeline of Events </h1>
            <div className="row d-flex justify-content-evenly">
              <div className="col text-end">
                <a href="#addform" id="addhref">
                  <IoAddCircle size={150} />
                </a>
              </div>
              <div className="col text-start">
                <a href="#calendar">
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

  const { eventTypeId, title, description, createdAt, eventId, photoUrl, username, userId } =
    props.event;

  const currentUser = props.event.userId;

  const postedOn = new Date(createdAt);
  const handleShow = () => {
    return eventId;
  };

  const post = format(postedOn, 'PPp');
  return (
    <div className='container'>
      <article>
        <div className="inner">
          <div className='col'>
            <EventType eventTypeId={eventTypeId} />
          </div>
          <div className='row no-gutters header-color justify-content-between d-flex clearfix '>
            <div className='col justify-evenly ps-1'>

              <p className="text-start text-color">{post}</p>

            </div>
            <div className='col align-self-center p-0'> <LoadUser eventId={eventId} userId={userId} username={username} loadUsers={props.loadUsers} /></div>
            <div className='col background-purp d-flex justify-content-end '>   <DeleteModal
      eventId={eventId}
      event={props.event}
      loadEvents={props.loadEvents}
    />

              <EditForm
      eventId={eventId}
      title={title}
      description={description}

      userId={userId}
      loadEvents={props.loadEvents}

    />

              <AllPhotos eventId={eventId} title={title} photoUrl={photoUrl} loadEvents={props.loadEvents} />

            </div>

            <p className='title-color text-center p-0'>{title}</p>

          </div>
          <div className='row description-color flex-wrap'>
            <div className='col text-wrap'>

              <p>{description}</p> </div>
          </div>

        </div>
      </article>
    </div>
  );
}

Timeline.contextType = AppContext;
