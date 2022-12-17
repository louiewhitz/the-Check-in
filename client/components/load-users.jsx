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
      userId: this.props.userId

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
        console.log(result);

        console.log(this.state);
        this.setState({
          loading: false,
          result

        });
        // console.log('this state after setSTate', this.state);

        // console.log(this.props);

      })
      .catch(err => {
        console.error('dang', err);

      });

  }

  componentDidMount() {
    this.loadUsers();
  }

  render() {
    // const res = this.state.result.username;
    // console.log("🚀 ~ file: load-users.jsx:55 ~ LoadUser ~ render ~ res ", res );
    const { user } = this.context;
    const { username, userId } = this.state;
    // console.log('🚀 ~ file: load-users.jsx:56 ~ render ~ this.state', this.state);

    // console.log('🚀 ~ file: load-users.jsx:57 ~ LoadUser ~ render ~ this.state', this.state);

    return (
      <div>Hello</div>
    );
  }
}

LoadUser.contextType = AppContext;
