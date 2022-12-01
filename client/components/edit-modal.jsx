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
      createdAt: '',
      active: null
    };
    this.handleChange = this.handleChange.bind(this);

    this.updateSubmit = this.updateSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { user } = this.context;

    // console.log('eventId', eventId);

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
      });
  }

  handleShow(event) {
    event.stopPropagation();

    // console.log(event, eventId);
    this.setState({
      show: true,
      isEditing: true,
      title: this.state.title,
      description: this.state.description
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
    console.log('event.target', event.target);
    console.log('event', event);

    this.setState({
      [name]: value
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
    fetch(`/api/events${this.props.eventId}`, req)
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch(err => console.error(err));
  }

  render() {
    console.log('props', this.props);
    console.log('props eventId', this.props.event);
    const { title, description, show, isEditing, eventId } = this.state;
    let titleVal = this.state.title;
    let descVal = this.state.description;

    if (this.state.onChange) {
      titleVal = this.state.title.value;
      descVal = this.state.description.value;
    }

    // const buttonText =
    //   this.context.route.params.get('mode') === 'edit'
    //     ? 'Delete'
    //     : 'Save Changes';

    const { handleChange, updateSubmit } = this;

    // if (this.state.onChange) {
    //   titleVal = this.title.value;
    //   console.log('titleVal', titleVal);
    //   descVal = this.state.title.value;
    // }

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
                value={titleVal}
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
              value={descVal}
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
