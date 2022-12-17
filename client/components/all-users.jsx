// import React from 'react';
// import AppContext from '../lib/app-context';
// import Redirect from './redirect';
// export default class AllUsers extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       users: [],
//       loading: true
//     };
//     this.load = this.load.bind(this);
//   }

//   load() {
//     const { user } = this.context.user;

//     fetch('/api/all-usernames', {
//       'X-Access-Token': localStorage.getItem('auth-token')

//     }, user)
//       .then(res => res.json())
//       .then(users => {
//         console.log(users);

//         this.setState({
//           users,
//           loading: false
//         });
//       }
//       )
//       .catch(err => {
//         console.error('Dang, not this time!', err);

//       });
//   }

//   componentDidMount() {
//     this.load();
//   }

//   render() {
//       console.log(this.state);

//     const { user } = this.context;

//     if (!user) {
//       return <Redirect to="#sign-in" />;
//     }
//     console.log(this.state);
//     console.log(this.props);
//     return (<section id="allusers">

//       <div key={user.userId}>{user.username}</div>

//     </section>);
//   }

// }

// AllUsers.contextType = AppContext;
