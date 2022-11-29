/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { Component } from 'react';
import AppContext from '../lib/app-context';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { RiEdit2Fill } from 'react-icons/ri';
import axios from 'axios';
import Redirect from './redirect';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      show: false,
      isEditing: false,
      createdAt: ''
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDesc = this.handleDesc.bind(this);
    this.updateSubmit = this.updateSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { route, user } = this.context;

    console.log('this.context', this.context);
    const eventId = Number(route.params.eventId);

    const token = localStorage.getItem('auth-token');
    fetch(`/api/events/${eventId}`, (req, res) => {
      req = {
        method: 'GET',
        headers: {
          'X-Access-Token': token,
          'Content-Type': 'application/json'
        },
        user
      }
        .then(res => res.json())
        .then(result => {
          const { title, description, createdAt } = result[0];
          this.setState({ title, description, createdAt });
          console.log('description', description);
        });
    });
    // if (route.params.get('mode') === 'edit') {
    //   const eventId = Number(route.params.get('eventId'));
    //   const req = {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-Access-Token': localStorage.getItem('auth-token')
    //     },
    //     user
    //   };
    //   fetch(`api/events/${eventId}`, req)
    //     .then(response => response.json())
    //     .then(result => {
    //       const { title, description, createdAt, updatedAt } = result[0];
    //       this.setState({ title, description, createdAt, updatedAt });
    //     });
    // }
  }

  handleShow() {
    this.setState({
      show: true,
      isEditing: true
    });
  }

  handleClose() {
    this.setState({
      show: false,
      isEditing: false
    });
  }

  handleTitle(event) {
    this.setState({ title: event.target.value });
    console.log('event.target.value', event.target.value);
  }

  handleDesc(event) {
    this.setState({ description: event.target.value });
  }

  updateSubmit(event) {
    event.preventDefault();
    if (this.isEditing === true) {
      const updatedTitle = this.state.title;
      const updatedDesc = this.state.description;
      const editId = this.props.eventId;
      const editing = this.props.isEditing;
      this.props.updateEvent(updatedTitle, updatedDesc, editId);
    } else {
      this.isEditing = false;
    }
  }

  render() {
    const { title, description, show, editId } = this.state;
    console.log(this.props.title);
    console.log('this.state', this.state);
    return (
      <>
        <Button onClick={this.handleShow} id="show-modal">
          <RiEdit2Fill size={30} className="mx-1" style={{ fill: '#25aae1' }} />
        </Button>
        <Modal show={show} onHide={this.handleClose} centered is={editId}>
          <Modal.Header closeButton>
            <Modal.Title>
              <input
                id="title"
                required
                name="title"
                type="text"
                onChange={this.handleTitle}
                value={title}
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
              onChange={this.handleDesc}
              value={description}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={this.handleClose}
              onSubmit={this.props.updateSubmit}
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
