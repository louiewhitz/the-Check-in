import React from 'react';
import { IoCamera } from 'react-icons/io5';
import AppContext from '../lib/app-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

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

    };

    fetch(`/api/events/${this.props.eventId}`, req)

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
        <Button onClick={this.handleShow} id="show-modal" className='pt-0 align-text-top '>
          <IoCamera size={25} style={{ fill: '#25aae1', paddingTop: '0%' }} className='pt-0' />
        </Button>
        <Modal show={show} onHide={this.handleClose} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      eventId={this.state.eventId}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.state.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body eventId={this.state.eventId}>
            <Image variant='top'
                fluid='true'
              src={this.state.photoUrl}
            />

          </Modal.Body>
          <Modal.Footer classNname=' border-0'>
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
