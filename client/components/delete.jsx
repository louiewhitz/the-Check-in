import React from 'react';
import AppContext from '../lib/app-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { RiDeleteBinFill } from 'react-icons/ri';

export default class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in Constructor', this.props);
    this.state = {
      title: '',
      description: '',
      show: false,
      delete: false,
      createdAt: ''
    };

    this.updateSubmit = this.updateSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { user } = this.context;

    // console.log('this.context', this.context);
    // const eventId = this.props.id;

    // console.log('eventId', eventId);
    const req = {
      method: 'GET',
      headers: {
        'X-Access-Token': localStorage.getItem('auth-token')
      },
      user
    };

    // const token = localStorage.getItem('auth-token');
    fetch('/api/events', req)
      .then(res => res.json())
      .then(result => {
        const { title, description, createdAt } = result[0];
        this.setState({
          title,
          description,
          createdAt
        });
        console.log('description', description);
      });
  }

  handleShow() {
    this.setState({
      show: true,
      delete: true
    });
  }

  handleClose() {
    this.setState({
      show: false,
      delete: false
    });
  }

  updateSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { eventId, show } = this.state;

    const modalTitle = 'Are you sure you want to delete this event?';

    return (
      <>
        <Button onClick={this.handleShow} id="show-delete">
          <RiDeleteBinFill
            size={30}
            className="mx-1"
            style={{ fill: '#fa7199' }}
          />
        </Button>
        <Modal show={show} onHide={this.handleClose} centered id={eventId}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={this.handleClose}
              onSubmit={this.props.updateSubmit}
              type="submit">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
DeleteModal.contextType = AppContext;
