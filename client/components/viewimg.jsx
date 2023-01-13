import React from 'react';
import AppContext from '../lib/app-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import Redirect from './redirect';
import LoadingSpinner from './loading-spinner';

const img = {
  height: '15rem',
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

  loadEvents() {
    this.setState({ loading: true });
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
      return <Redirect to="#sign-in" />;
    }

    if (this.state.loading) {
      return <LoadingSpinner />;
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
