import React from 'react';
import AppContext from '../lib/app-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { RiDeleteBinFill } from 'react-icons/ri';

export default class DeleteModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: this.props.eventId,
      userId: this.props.event.userId,

      show: false
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  handleDelete(event) {
    const { user } = this.context;
    event.preventDefault();
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('auth-token')
      },
      user
    };

    fetch(`/api/events/delete/${this.props.eventId}`, req)
      .then(response => response.json())
      .then(result => {
        this.setState({
          show: false
        });
        this.props.loadEvents();
      })
      .catch(err => console.error(err));
  }

  render() {

    const { show, userId } = this.state;

    const contextUserId = this.context.user.userId;

    if (contextUserId !== userId) {
      return;
    }

    const modalTitle = 'Are you sure you want to delete this event?';

    return (
      <>
        <Button onClick={this.handleShow} id="show-delete">
          <RiDeleteBinFill
            size={30}

            style={{ fill: '#fa7199' }}
          />
        </Button>
        <Modal show={show} onHide={this.handleClose} centered>
          <form onSubmit={this.handleDelete} id={this.state.eventId}>
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
                type="submit">
                Delete
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}
DeleteModal.contextType = AppContext;
