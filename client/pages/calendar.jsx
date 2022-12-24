// import React from 'react';
// import AppContext from '../lib/app-context';
// import Redirect from '../components/redirect';
// import 'react-calendar/dist/Calendar.css';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import axios from 'axios';

// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
// import NetError from '../components/network-error';
// import LoadingSpinner from '../components/loading-spinner';
// import { Col, Card } from 'react-bootstrap';
// import Toolbar from 'react-big-calendar/lib/Toolbar';

// import moment from 'moment';
// const views = ['day', 'week', 'month', 'agenda'];
// const localizer = momentLocalizer(moment);

// const handleChange = () => {
//   console.log('this block code executed');
// };

// export default class NewCalendar extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       schedules: [],

//       loading: true,
//       networkError: false
//     };
//     this.loadEvents = this.loadEvents.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleNavigation = this.handleNavigation.bind(this);

//   }

//   handleNavigation(date, view, action) {
//     console.log(date, view, action);

//   }

//   handleChange() {
//     console.log('block of code to be executed');
//   }

//   loadEvents() {
//     const self = this;
//     axios.get('/api/schedules', {
//       headers: {
//         'X-Access-Token': localStorage.getItem('auth-token')
//       }
//     })
//       .then(response => {

//         const schedules = response.data;
//         console.log('file: calendar.jsx:59 ~ NewCalendar ~ loadEvents ~ schedules', schedules);
//         const start = moment(schedules.startDate).toDate();

//         for (let i = 0; i < schedules.length; i++) {
//           schedules[i].start = moment.utc(schedules[i].start).toDate();
//           console.log('file: calendar.jsx:77 ~ NewCalendar ~ loadEvents ~ schedules[i].start', schedules[i].start);
//           schedules[i].startDate = moment(schedules[i].startDate).toDate();
//           schedules[i].startTime = moment(schedules[i].startTime, 'HH:mm').format('hh:mm A');
//           schedules[i].endTime = moment(schedules[i].endTime, 'HH:mm').format('hh:mm A');

//           schedules[i].end = moment.utc(schedules[i].end).toDate();

//         }

//         self.setState({
//           schedules,

//           loading: false
//         });

//         console.log('self state', this.state);

//       })
//       .catch(function (error) {
//         console.error(error);
//       });

//   }

//   componentDidMount() {
//     this.loadEvents();

//   }

//   render() {

//     console.log('file: calendar.jsx:104 ~ NewCalendar ~ render ~ this.state', this.state);

//     // const { title, startTime, endTime, startDate, scheduleId } = this.state;

//     // console.log('file: calendar.jsx:98 ~ NewCalendar ~ render ~ this.state', this.state);

//     // console.log('file: calendar.jsx:86 ~ NewCalendar ~ render ~ schedules', schedules);
//     const { user } = this.context;

//     if (!user) {
//       return <Redirect to="#sign-in" />;
//     }

//     if (this.state.networkError) {
//       return <NetError />;
//     }

//     if (this.state.loading) {
//       return <LoadingSpinner />;
//     }
//     const localizer = momentLocalizer(moment);

//     return (
//       <div>
//         <Calendar id="calendar"
//         localizer={localizer}
//         views={views}
//         startAccessor="start"
//         endAccessor="end"
//     >    {this.state.schedules.map(schedule => {

//       return (
//         <Card key={schedule.scheduleId}>
//           <BigCalendar
//                   key={schedule.scheduleId}
//                   schedule={schedule}
//                   loadEvents={this.loadEvents}
//                   localizer={localizer}

//                 />
//         </Card>
//       );
//     })}

//         </Calendar>
//     </div>);

//   }

// }
// // const EventComponent = ({ schedules, change }) => (props) => {
// //   return (
// //     <div className="customEventTile" title="This is EventTile">
// //       <h5>{props.event.title}</h5>
// //       <button onClick={props.change}>Do Something</button>
// //     </div>
// //   );
// // };

// function BigCalendar(props) {
//   console.log('file: calendar.jsx:160 ~ BigCalendar ~ props', props);

//   return (<div className='tex-dark'>Hi</div>

//   );

// }
// NewCalendar.contextType = AppContext;
