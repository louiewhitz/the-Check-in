/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import AppContext from '../lib/app-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { RiEdit2Fill } from 'react-icons/ri';
import axios from 'axios';
import Redirect from './redirect';
import AddForm from '../pages/add-form';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in Constructor', this.props);
    this.state = {
      title: '',
      description: '',
      show: false,
      isEditing: false,
      eventId: null
    };
    this.handleChange = this.handleChange.bind(this);

    this.updateSubmit = this.updateSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { user, route } = this.context;

    const req = {
      method: 'GET',
      headers: {
        'X-Access-Token': localStorage.getItem('auth-token')
      },
      user
    };

    fetch(`/api/events/${this.props.eventId}`, req)
      .then(res => res.json())
      .then(result => {
        const { title, description, createdAt, eventId } = result;
        console.log('result', result);
        this.setState({
          title,
          description,
          createdAt,
          eventId
        });
      });
  }

  handleShow() {
    const { title, description, createdAt, eventId } = this.state;
    this.setState({
      show: true,

      // title: this.state.title,
      // descriptio: this.state.description,

      // title: this.state.title,
      // description: this.state.description,
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
      isEditing: true,
      eventId: this.state.eventId
    });
  }

  updateSubmit(event) {
    event.preventDefault();
    console.log('submit event', event);
    const { user } = this.context;
    const eventId = Number(this.props.eventId);
    console.log('eventId', eventId);
    const req = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('auth-token')
      },
      user,
      body: JSON.stringify(this.state)
    };
    fetch(`/api/events${eventId}`, req)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({
          title: '',
          description: '',
          isEditing: false,
          eventId: null
        }).then(() => {
          window.location.hash = `#timeline?eventId=${this.props.eventId}`;
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    // const { title, description, show, eventId } = this.state;
    const { user } = this.context;
    const { title, description, show, eventId } = this.state;
    console.log('this.state', this.state);

    console.log('props in render', this.props);

    console.log('props in render', this.props);

    const { handleChange, updateSubmit } = this;

    return (
      <>
        <Button onClick={this.handleShow} id="show-modal">
          <RiEdit2Fill size={30} className="mx-1" style={{ fill: '#25aae1' }} />
        </Button>
        <Modal
          show={show}
          onHide={this.handleClose}
          centered
          id={this.props.eventId}>
          <Modal.Header closeButton>
            <Modal.Title>
              <input
                id="title"
                required
                name="title"
                type="text"
                onChange={handleChange}
                value={
                  title === this.isEditing
                    ? this.props.title
                    : this.state.title.value
                }
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
              value={
                description === this.isEditing
                  ? this.props.description
                  : this.state.description.value
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={this.handleClose}
              onSubmit={updateSubmit}
              type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

EditForm.contextType = AppContext;
