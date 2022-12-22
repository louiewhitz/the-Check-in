// import React from 'react';
// import AppContext from '../lib/app-context';
// import Redirect from '../components/redirect';
// import 'react-calendar/dist/Calendar.css';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import axios from 'axios';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import enUS from 'date-fns/locale/en-US';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

// const locales = {
//   'en-US': enUS
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales
// });

// export default class NewCalendar extends React.Component {
//   constructor(props) {
//     console.log('file: viewcalendar.jsx:37 ~ ViewCalendar ~ constructor ~ props', props);
//     super(props);
//     this.state = {
//       selectedEvent: null
//     };

//   }

//   handleEventSelection = event => {
//     this.setState({ selectedEvent: event });
//     this.sendEventToServer(event);
//   };

//   sendEventToServer = event => {
//     fetch('/api/schedules/schedule-time', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         title: event.title,
//         startTime: event.start,
//         endTime: event.end
//       })
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   render() {
//     return (
//       <div>
//         <Calendar
//           onSelectEvent={this.handleEventSelection}
//           localizer={localizer}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: 500 }}
//         />
//         {this.state.selectedEvent && (
//           <div>
//             <p>Title: {this.state.selectedEvent.title}</p>
//             <p>Start Time: {this.state.selectedEvent.start}</p>
//             <p>End Time: {this.state.selectedEvent.end}</p>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
// NewCalendar.contextType = AppContext;
