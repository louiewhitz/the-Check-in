/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import AppContext from '../lib/app-context';
// import AddForm from '../pages/add-form';
export default class LoadUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: this.props.eventId,
      userId: this.props.userId,
      username: ''

    };
    this.loadUsers = this.loadUsers.bind(this);
  }

  loadUsers() {
    const { userId } = this.context.user;

    const req = {
      method: 'POST',
      headers: { 'X-Access-Token': localStorage.getItem('auth-token') },
      userId,
      body: JSON.stringify(this.state)

    };
    fetch(`/api/events/users/${this.props.eventId}`, req)
      .then(response => response.json())
      .then(result => {
        const thisusername = result[0].username;
        const userid = result[0].userId;

        const thisevent = this.props.eventId;

        this.setState({
          loading: false,
          username: thisusername,
          eventId: thisevent,
          userId: userid

        });

      })

      .catch(err => {
        console.error('dang', err);

      });

  }

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    const { user } = this.context;
    const { username, userId, eventId } = this.state;

    return (

      <h2 className='username text-center align-top fs-4'>{username}</h2>
    );
  }
}

LoadUser.contextType = AppContext;
