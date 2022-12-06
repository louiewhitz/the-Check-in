/* eslint-disable no-unused-vars */
import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import { IoAddCircle, IoCalendarSharp, IoCamera } from 'react-icons/io5';
import { format } from 'date-fns';
import EventType from '../components/eventtypes';
import EditForm from '../components/edit-modal';
import DeleteModal from '../components/delete';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading: true
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
      .catch(err => console.error('Dang, not this time!', err));
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

    return this.state.loaing
      ? (
        <p>...Please hold on a sec, loading</p>
        )
      : this.state.entries === 0
        ? (
          <div className="container mt-nav">
            <p>Sorry there are no events yet.</p>
          </div>
          )
        : (
          <div className="container">
            <h1 className="text-center text-white">Timeline of Events </h1>
            <div className="row d-flex justify-content-evenly">
              <div className="col text-end">
                <a href="#addform">
                  <IoAddCircle size={150} style={{ fill: 'greenyellow' }} />
                </a>
              </div>
              <div className="col text-start">
                <a href="#scheduling">
                  <IoCalendarSharp size={150} style={{ fill: 'purple' }} />
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
  const { eventTypeId, title, description, createdAt, eventId, updatedAt } =
    props.event;

  const postedOn = new Date(createdAt);

  const post = format(postedOn, 'EEEE, ii, yy');

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
              loadEvents={props.loadEvents}
            />
            <IoCamera size={30} className="mx-1" style={{ fill: '#25aae1' }} />
          </span>
        </h2>

        <p>{description}</p>
      </div>
    </article>
  );
}

Timeline.contextType = AppContext;
