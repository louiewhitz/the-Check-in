import React from 'react';

import AppContext from '../lib/app-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Container } from 'react-bootstrap';
import Redirect from './redirect';
import LoadingSpinner from './loading-spinner';

const img = {
  height: '15rem',
  objectFit: 'cover'
};

const style = {
  width: '18rem',
  height: '100%'
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
    // this.loadSpin = this.loadSpin.bind(this);
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

  // loadSpin() {
  //   if (this.state.loading === true) {
  //     return <LoadingSpinner />;
  //   }
  // }
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
              <h1 className="text-center text-white">IMAGES</h1>
              <section id="allphotos">
                {this.state.events.map(event => {
                  return (
                    <div key={event.eventId} className='fix'>
                      <ViewPhoto
                  key={event.eventId}
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

  return (<Container className='p-4'>
    <Row style={style}>

      <Col>
        <Card eventId={eventId} className='my-3'>
          <Card.Img variant='top'
              src={photoUrl}
              style={img}
            //   className="rounded-top img-fluid img"
            />
          <Card.Body><Card.Title>{title}</Card.Title></Card.Body>
        </Card>
      </Col>

    </Row>
  </Container>
  );
}
ViewAllImages.contextType = AppContext;
