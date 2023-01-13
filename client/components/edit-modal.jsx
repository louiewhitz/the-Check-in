import React from 'react';
import AppContext from '../lib/app-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { RiEdit2Fill } from 'react-icons/ri';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventId: this.props.eventId,
      title: this.props.title,
      description: this.props.description,
      userId: this.props.userId,
      show: false,
      isEditing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateSubmit = this.updateSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({
      show: true,
      isEditing: false
    });
  }

  handleClose() {
    this.setState({
      show: false,
      isEditing: false
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isEditing: true
    });
  }

  updateSubmit(event) {
    event.preventDefault();

    const { user } = this.context;

    const req = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('auth-token')
      },
      user,
      body: JSON.stringify(this.state)
    };

    fetch(`/api/events/${this.props.eventId}`, req)
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

    const { handleChange, updateSubmit } = this;

    return (
      <>
        <Button onClick={this.handleShow} id="show-modal" className='align-top'>
          <RiEdit2Fill size={25} style={{ fill: '#25aae1', paddingTop: '0%' }} />
        </Button>
        <Modal show={show} onHide={this.handleClose} centered>
          <form onSubmit={updateSubmit} id={this.state.eventId}>
            <Modal.Header closeButton>
              <Modal.Title>
                <input
                  id="title"
                  required
                  name="title"
                  type="text"
                  onChange={handleChange}
                  value={this.state.title}
                  placeholder="Title..."
                  className="form-control rounded bg-transparent px-4 py-2.5 font-bold text-heading"
                />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <textarea
                className="form-control border-2 border-muted-2 bg-transparent px-4 py-2.5"
                rows="5"
                id="description"
                name="description"
                onChange={handleChange}
                value={this.state.description}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={this.handleClose}
                type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}

EditForm.contextType = AppContext;
