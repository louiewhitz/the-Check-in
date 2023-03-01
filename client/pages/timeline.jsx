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
// import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
      networkError: false,
      user: null

    };
    this.handleClick = this.handleClick.bind(this);
    this.loadEvents = this.loadEvents.bind(this);

  }

  async loadEvents() {
    this.setState({ loading: true });
    try {
      const response = await fetch('/api/events', {
        headers: {
          'X-Access-Token': localStorage.getItem('auth-token')
        }
      });
      const events = await response.json();
      this.setState({
        events,
        loading: false
      });
    } catch (err) {
      console.error('Dang, not this time!', err);
      this.setState({ networkError: true });
    }
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
      return <Redirect to="sign-in" />;
    }

    if (this.state.networkError) {
      return <NetError />;
    }

    return this.state.loaing
      ? (
        <LoadingSpinner />
        )
      : !this.state.events.length
          ? (
            <div className="container mt-nav">
              <div className="row">
                <h1 className="text-center timeline-color">Timeline of Events </h1>
                <h4 className="no-events  no-events">Sorry, no events have been recorded. Click to add an event to the timeline or schedule an event in the calendar.</h4>
              </div>
              <div className="row d-flex justify-content-evenly">
                <div className="col text-end">

                  <a href="#addform" id="addhref">
                    <IoAddCircle size={150} className="icon-shadow"/>
                  </a>

                </div>
                <div className="col text-start">
                  <a href="#calendar">
                    <IoCalendarSharp size={150} className="icon-shadow" />
                  </a>

                </div>
              </div>

            </div>
            )
          : (
            <div className="container">

              <h1 className="text-center timeline-color">Timeline of Events </h1>
              <div className="row d-flex justify-content-evenly">
                <div className="col text-end">
                  {/* <OverlayTrigger
              placement="top"
              trigger={["focus", "hover"]}
              overlay={<Tooltip>Add an Event</Tooltip>}> */}
                  <a href="#addform">
                    <IoAddCircle
                  size={150}
                  style={{ cursor: 'pointer' }}

                  className="icon-shadow"
                />
                  </a>
                  {/* </OverlayTrigger> */}
                </div>
                <div className="col text-start">
                  {/* <OverlayTrigger style={{ height: '150px', width: '150px' }}
              placement="top"
              trigger={["focus", "hover"]}
              overlay={<Tooltip>Schedule an Event</Tooltip>}> */}
                  <a href="#calendar">
                    <IoCalendarSharp
                  size={150}
                  className="icon-shadow"
                  style={{ cursor: 'pointer' }}

                />
                  </a>
                  {/* </OverlayTrigger> */}
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
          <div className='row no-gutters padding-gutter header-color justify-content-between d-flex align-items-start align-top box-shadow'>
            <div className='col align-self-start padding-gutter'>

              <p className=" text-color ps-2">{post}</p>

            </div>
            <div className='col align-self-start align-top load-user'> <LoadUser eventId={eventId} userId={userId} username={username} loadUsers={props.loadUsers} className='.align-top py-0'/></div>
            <div className='col background-purp d-flex justify-content-end p-0 pe-1'>   <DeleteModal
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

              <AllPhotos eventId={eventId} title={title} photoUrl={photoUrl} loadEvents={props.loadEvents} className='pe-1' />

            </div>
            <div className='row padding-gutter no-gutters mg justify-content-center align-items-center'> <div className='col p-0 align-self-center  '><p className='title-color  text-center pt-2 '>{title}</p></div></div>

          </div>
          <div className='row description-color flex-wrap box-shadow'>
            <div className='col text-wrap'>

              <p>{description}</p> </div>
          </div>

        </div>
      </article>
    </div>
  );
}

Timeline.contextType = AppContext;
