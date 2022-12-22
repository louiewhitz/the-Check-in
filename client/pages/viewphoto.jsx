import React from 'react';
import { IoCamera } from 'react-icons/io5';
import AppContext from '../lib/app-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal } from 'react-bootstrap';
const img = {
  height: '20rem',
  objectFit: 'cover'
};

const style = {
  width: '26rem',
  height: '100%'
};

export default class AllPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.eventId,
      photoUrl: this.props.photoUrl,
      show: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({ show: true });
    const { user } = this.context;

    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('auth-token')
      },
      user
      // body: JSON.stringify(this.state)
    };

    fetch(`/api/events/${this.props.eventId}`, req)
      // .then(response => response.json())
      .then(result => {

        this.props.loadEvents();
      })

      .catch(err => console.error(err));

  }

  handleClose() {
    this.setState({
      show: false
    });
  }

  render() {
    if (!this.state.photoUrl) {
      return null;
    }

    const { show } = this.state;

    return (
      <>
        <Button onClick={this.handleShow} id="show-modal">
          <IoCamera size={30} style={{ fill: '#25aae1' }} />
        </Button>
        <Modal show={show} onHide={this.handleClose} centered className=' d-flex justify-contect-center align-items-center text-center'>
          <Modal.Body className='bg-transparent'>
            <Card eventId={this.state.eventId} className='d-flex justify-content-center bg-light border-0' style={ style }>
              <Card.Img variant='top'
              src={this.state.photoUrl}
              style={img}

            />
              <Card.Body className="bg-transparent"><Card.Title>{this.state.title}</Card.Title></Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer className='bg-secondary border-0'>
            <Button variant="info" onClick={this.handleClose} className='d-block'>
              Back to Timeline
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

AllPhotos.contextType = AppContext;
