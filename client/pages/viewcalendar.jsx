import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

export default class ViewCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      title: '',
      startTime: '',
      endTime: '',
      timelineId: 1
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleDateChange(date) {
    this.setState({ selectedDate: date });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleStartTimeChange(event) {
    this.setState({ startTime: event.target.value });
  }

  handleEndTimeChange(event) {
    this.setState({ endTime: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formatStart = moment(this.state.startTime).format('HH:mm:ss');
    const formatEnd = moment(this.state.endTime).format('HH:mm:ss');
    const newDate = moment(this.state.selectedDate).format('YYYY-MM-DD');

    const formData = new FormData();

    formData.append('title', this.state.title);
    formData.append('date', newDate);
    formData.append('startTime', formatStart);
    formData.append('endTime', formatEnd);
    fetch('/api/schedules/schedule-time', {
      method: 'POST',
      headers: {
        'X-Access-Token': localStorage.getItem('auth-token')
      },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  render() {

    const { user } = this.context;
    if (!user) {
      return <Redirect to="#sign-in" />;
    }

    return (
      <form id='scheduleId' onSubmit={this.handleSubmit}>
        <div className='myCalendar container'>
          <div className='calendar-container'>
            <Calendar calendarType='US'
          selected={this.state.selectedDate}
          onChange={this.handleDateChange}
          id="date"
          name="date"
                          />
            <input
          className='placeholderCal'
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}
          placeholder="Event title"
        />

            <label
                    htmlFor="startTime"
                    className="fs-5 form-label text-muted mg-cal">
              Startime: {this.state.endTime}
            </label>
            <input
          type="time"
          className='calInput'
          value={this.state.startTime}
          onChange={this.handleStartTimeChange}
          placeholder="Start time"
        />
            <label
                    htmlFor="Endtime"
                    className="fs-5 form-label text-muted mg-cal">
              Endtime: {this.state.endTime}
            </label>
            <input
          type="time"
          className='calInput'
          value={this.state.endTime}
          onChange={this.handleEndTimeChange}
          placeholder="End time"
        />
            <div>
              <p>Selected date: {this.state.selectedDate.toString()}</p>
              <p>Event title: {this.state.title}</p>
              <p>Start time: {this.state.startTime}</p>
              <p>End time: {this.state.endTime}</p>
            </div>

          </div>
          <Button as="input" type="submit" value="Submit" />
          <Button as="input" type="reset" value="Reset" />

        </div>
      </form>
    );
  }

}

ViewCalendar.contextType = AppContext;
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
// const events = [{ start: new Date(), end: new Date(), title: 'special event' }];
// const DnDCalendar = withDragAndDrop(Calendar);

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

// export default class ViewCalendar extends React.Component {
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
// ViewCalendar.contextType = AppContext;
// export default class ViewCalendar extends React.Component {
//   constructor(props) {
//     console.log(props);
//     super(props);
//     this.state = {
//       scheduleTime: this.props.updatedAt,
//       timelineId: this.props.timelineId
//     };
//     console.log(this.state);
//   }

//   render() {
//     const { user } = this.context;
//     console.log('file: viewcalendar.jsx:20 ~ ViewCalendar ~ render ~ user', user);
//     return (
//       <div>Hello</div>
//     );
//   }

// }

// ViewCalendar.contextType = AppContext;
