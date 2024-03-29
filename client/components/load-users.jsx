
import React from 'react';
import AppContext from '../lib/app-context';
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

  async loadUsers() {
    const { userId } = this.context.user;
    const req = {
      method: 'POST',
      headers: { 'X-Access-Token': localStorage.getItem('auth-token') },
      userId,
      body: JSON.stringify(this.state)

    };
    try {
      const response = await fetch(`/api/events/users/${this.props.eventId}`, req);
      const result = await response.json();
      const thisusername = result[0].username;
      const userid = result[0].userId;
      const thisevent = this.props.eventId;
      this.setState({
        loading: false,
        username: thisusername,
        eventId: thisevent,
        userId: userid
      });

    } catch (err) {
      console.error('dang', err);
    }
  }

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    const { username } = this.state;
    return (
      <h2 className='username text-center align-top fs-4'>{username}</h2>
    );
  }
}

LoadUser.contextType = AppContext;
