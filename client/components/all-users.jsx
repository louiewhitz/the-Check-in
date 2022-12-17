// import React, { useState, useEffect, useContext } from 'react';
// // import AppContext from '../lib/app-context';
// import Redirect from './redirect';
// import axios from 'axios';

// export default function AllUsers() {

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => {

//     axios.get('/api/all-users', {
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Access-Token': localStorage.getItem('auth-token')

//       }

//     })
//       .then(response => {
//         setData(response.data);
//         console.log('🚀 ~ file: all-users.jsx:25 ~ useEffect ~ response.data', response.data);
//       })

//       .catch(error => {
//         console.error('Error fetching Data', error);
//         setError(error);
//         console.log(error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div>{data && data.map(users => {
//       return (

//         <li className="text-white" key={users.userId}>{users.username}</li>
//       );

//     })}</div>
//   );

// }
