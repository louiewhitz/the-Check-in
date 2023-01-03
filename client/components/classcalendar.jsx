// import React from 'react';
// import 'react-calendar/dist/Calendar.css';
// // import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import DatePicker from 'react-multi-date-picker';

// // import format from 'date-fns/format';
// // import parse from 'date-fns/parse';
// // import startOfWeek from 'date-fns/startOfWeek';
// // import getDay from 'date-fns/getDay';
// // import enUS from 'date-fns/locale/en-US';
// import moment from 'moment';
// import AppContext from '../lib/app-context';
// import axios from 'axios';
// import DatePanel from 'react-multi-date-picker/plugins/date_panel';

// import TimePicker from 'react-multi-date-picker/plugins/time_picker';

// import 'react-big-calendar/lib/css/react-big-calendar.css';
// // import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
// // const timezeone = require('moment-timezone');
// // const locales = {
// //   'en-US': enUS
// // };

// // const start = moment(schedules.startDate).toDate();

// // const localizer = dateFnsLocalizer({
// //   format,
// //   parse,
// //   startOfWeek,
// //   getDay,
// //   locales
// // });

// export default class ClassCalendar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       start: '',
//       end: '',
//       startTime: '',
//       endTime: '',
//       timelineId: 1,
//       title: ''
//       // events: []
//     };
//     this.handleTitle = this.handleTitle.bind(this);
//     this.handleAddEvent = this.handleAddEvent.bind(this);
//     this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
//     this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
//     // this.loadEvents = this.loadEvents.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleDateChange = this.handleDateChange.bind(this);
//   }

//   handleStartTimeChange(event) {
//     const momentStart = moment(event.target.value, ' HH:mm');
//     const formattedStart = momentStart.format('YYYY-MM-DD HH:mm:ss');

//     this.setState({ startTime: formattedStart });
//   }

//   handleDateChange(start, end) {

//   }

//   handleEndTimeChange(event) {
//     const momentEnd = moment(event.target.value, 'HH:mm');
//     const formattedEnd = momentEnd.format('YYYY-MM-DD HH:mm:ss');

//     this.setState({ endTime: formattedEnd });
//   }

//   handleTitle(e) {
//     this.setState({
//       title: e.target.value
//     });

//   }

//   handleAddEvent(event) {
//     const { start, end, startTime, endTime, title } = event.target;
//     console.log('file: classcalendar.jsx:79 ~ ClassCalendar ~ handleAddEvent ~ title', title);
//     console.log('file: classcalendar.jsx:79 ~ ClassCalendar ~ handleAddEvent ~ endTime', endTime);
//     console.log('file: classcalendar.jsx:78 ~ ClassCalendar ~ handleAddEvent ~ startTime', startTime);
//     console.log('file: classcalendar.jsx:78 ~ ClassCalendar ~ handleAddEvent ~ end', end);
//     console.log('file: classcalendar.jsx:78 ~ ClassCalendar ~ handleAddEvent ~ start', start);
//     // const formattedStart = momentStart.format('YYYY-MM-DD HH:mm:ss');

//     this.setState({
//       title,
//       end,
//       start,
//       startTime,
//       endTime

//     });

//     // const start = moment(events.start).format('YYYY-MM-DD');
//     // const end = moment(events.end).format('YYYY-MM-DD');
//     // const title = events.title;
//     // const startTime = moment(events.startTime).format('HH:mm:ss A');
//     // const endTime = moment(events.EndTime).format('HH:mm:ss A');
//     // const timelineId = 1;
//     // this.setState({
//     //   events: [...events, { start, end, title, startTime, endTime, timelineId }]
//     // });

//     console.log(this.state);
//   }

//   loadEvents() {
//     const self = this;
//     axios.get('/api/schedules', {
//       headers: {
//         'X-Access-Token': localStorage.getItem('auth-token')
//       }
//     })
//       .then(response => {

//         const events = response.data;

//         self.setState({
//           events

//         });

//         console.log('self state', this.state);

//       })
//       .catch(function (error) {
//         console.error(error);
//       });

//   }

//   // componentDidMount() {
//   //   this.loadEvents();
//   // }

//   handleSubmit(event) {

//     console.log(this.state);
//     event.preventDefault();

//     // const body = {
//     //   start: this.state.start,
//     //   end: this.state.end,
//     //   starTime: this.state.startTime,
//     //   timelineId: 1,
//     //   title: this.state.title,
//     //   endTime: this.state.endTime
//     // };
//     console.log('file: classcalendar.jsx:125 ~ ClassCalendar ~ handleSubmit ~ body ', this.state);

//     fetch('/api/schedules/schedule-time', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Access-Token': localStorage.getItem('auth-token')
//       },
//       body: JSON.stringify(this.state)
//     })
//       .then(res => res.json())

//     //   .then(() => {
//     //     this.setState({ loading: false });
//     //     window.location.hash = '#calendar';
//     //   })
//       .catch(err => {
//         console.error('Dang! Fetch FAIIIIILED', err);
//         // this.setState({ networkError: true });
//       });
//   }

//   render() {
//     const { start, end, title, startTime, endTime, events } = this.state;

//     return (
//       <div className='calendarApp'>
//         <h1>Calendar</h1>
//         <h2>Add New Event</h2>
//         <div>
//           <form onSubmit={this.handleSubmit}>

//             <input type="text" placeholder="Add Title" name="title" id="title" style={{ width: '20%', marginRight: '10px' }} value={this.state.title} onChange={this.handleTitle} />
//             <DatePicker
//             range
//             startAccessor={start}
//             endAccessor={end}

//           style={{ marginRight: '10px' }}
//           // selected={this.state.start}
//           format="MM-DD-YYYY HH:MM:ss"
//           onChange={this.handleAddEvent}
//            plugins={[

//              // eslint-disable-next-line react/jsx-key
//              <TimePicker position="bottom" />,
//              // eslint-disable-next-line react/jsx-key
//              <DatePanel markFocused />
//            ]}/>

//             <button style={{ marginTop: '10px' }} onClick={this.handleAddEvent} type="submit" value="Submit">Add Event</button>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// // function myCal(props) {
// //   const { title, start, end, events } = props.events;
// //   return (
// //     <Calendar
// //       localizer={localizer}
// //       events={props.events.map(event => {
// //         return (

// //         )

// //       })}
// //       range

// //       startAccessor="start"
// //       endAccessor="end"
// //       style={{ height: 500 }}
// //     />
// //   );
// // }

// ClassCalendar.contextType = AppContext;
