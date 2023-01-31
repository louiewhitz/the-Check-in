import React from 'react';
import AppContext from '../lib/app-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Redirect from './redirect';
import LoadingSpinner from './loading-spinner';

const img = {
  height: '20rem',
  objectFit: 'cover'
};
export default class ViewAllImages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading: false,
      show: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.loadEvents = this.loadEvents.bind(this);
  }

  async loadEvents() {
    try {
      this.setState({ loading: true });
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
    }
  }

  componentDidMount() {
    this.loadEvents();
  }

  handleShow() {
    this.setState({
      show: true
    });
  }

  handleClose() {
    this.setState({
      show: false
    });
  }

  render() {
    const { user } = this.context;
    if (!user) {
      return <Redirect to="sign-in" />;
    }

    return this.state.loaing
      ? (
        <LoadingSpinner />
        )
      : !this.state.events.length
          ? (
            <div className="container mt-nav">
              <div className="row">
                <h1 className="text-center timeline-color">IMAGES</h1>
                <h4 className="no-events">Sorry, there are no images yet. If you or anyone in your party add an event to the timeline, all images will be displayed here.</h4>
              </div>
            </div>
            )
          : (
            <div className="container">

              <div className="row">
                <h1 className="text-center timeline-color">IMAGES</h1>
                <section id="allphotos">
                  {this.state.events.map(event => {
                    return (
                      <div key={event.eventId} className='fix'>
                        <ViewPhoto
                  event={event}
                  loadEvents={this.loadEvents}
                />
                      </div>
                    );
                  })}
                </section>
              </div>
            </div>
            );
  }
}
function ViewPhoto(props) {
  const { photoUrl, eventId, title } = props.event;

  if (!photoUrl) {
    return null;
  }

  return (
    <Card eventId={eventId} className='m-2 style'>
      <Card.Img variant='top'
              src={photoUrl}
               style={img}
            />
      <Card.Body><Card.Title className='small-text'>{title}</Card.Title></Card.Body>
    </Card>

  );
}
ViewAllImages.contextType = AppContext;
