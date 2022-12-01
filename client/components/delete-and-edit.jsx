/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import EditForm from './edit-modal';
import AppContext from '../lib/app-context';

export default class updateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      createdAt: '',
      updatedAt: '',
      isEditing: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { route, user } = this.context;
    if (route.params.get('mode') === 'edit') {
      const eventId = Number(route.params.get('eventId'));
      const req = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('auth-token')
        },
        user
      };
      fetch(`api/events/${eventId}`, req)
        .then(response => response.json())
        .then(result => {
          const { title, description, createdAt, updatedAt } = result[0];
          this.setState({ title, description, createdAt, updatedAt });
        });
    }
  }
}

updateForm.contextType = AppContext;
