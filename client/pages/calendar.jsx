import React, { useState, useRef, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import IonDate from '../components/ionDate';
import moment from 'moment';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';

export default function NewCalendar() {
  const [events, setEvents] = React.useState([]);
  const localizer = momentLocalizer(moment);
  const [time, setTime] = useState();
  console.log('file: calendar.jsx:12 ~ NewCalendar ~ time', time);

  //   const [time, startTime] = useState(null);
  //   const [endTime, setEndTime] = useState(null);
  const [title, setTitle] = useState('');
  console.log('file: calendar.jsx:15 ~ NewCalendar ~ title', title);

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch('/api/schedules', {
        headers: {
          'X-Access-Token': localStorage.getItem('auth-token')
        }
      });
      const events = await response.json();
      setEvents(events);
    }
    fetchEvents();
  }, []);
  const [date, setDate] = useState();
  const [endDate, setEndDate] = useState();
  console.log('file: calendar.jsx:44 ~ NewCalendar ~ endDate', endDate);

  console.log('file: calendar.jsx:43 ~ NewCalendar ~ date', date);

  // function checkConsole() {
  //   console.log('clicked');
  // }

  // function checkSelect(event) {
  //   console.log(event.target);
  // }

  function MyPlugin() {
    return 'my first plugin !';
  }
  const newDate = new DateObject('YYYY-MM-DD HH:MM:SS');
  const [dateObj, setDateObj] = useState(
    [
      new Date(),
      new DateObject('YYYY-MM-DD HH:MM:ss')

    ]
  );
  console.log('file: calendar.jsx:42 ~ NewCalendar ~ dateObj', dateObj);
  function handleSubmit(event) {
    event.preventDefault();
    const start = moment(dateObj.dateFocused).format('YYYY-MM-DD');
    const end = moment(dateObj.dateClicked).format('YYYY-MM-DD');
    const title = event.title;

    // if (date && time && title) {
    //   const start = new Date(date + ' ' + time);
    //   const end = new Date(start.getTime() + 3600000);
    //   const newEvent = { start, end, title };
    //   setEvents([...events, newEvent]);

    // }

    // const handleChange = (dateFocused, dateClicked) => {
    //   setDateObj({ dateFocused, dateClicked });
    // };
  }

  function handleStartDate(date) {

  }
  return (
    <div className="react-big-calendar">
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <IonDate />
      <div> <form onSubmit={handleSubmit}>
        <input type="text" value={title} placeholder='Add Title' onChange={e => setTitle(e.target.value)} />
        <DatePicker multiple
         format="MM-DD-YYYY MM:SS:HH"
         range

        onClose={() => setDateObj({})}
    onChange={(date, endDate) => {
      const formattedDate = moment(date).format('YYYY-MM-DD HH:MM:SS');
      setDate(formattedDate);
      const formatEnd = moment(endDate).format('YYYY-MM-DD HH:MM:SS');
      setEndDate(formatEnd);
      setDateObj({ formattedDate, endDate });

    }}

      plugins={[
        // eslint-disable-next-line react/jsx-key
        <TimePicker position="bottom" />,
        // eslint-disable-next-line react/jsx-key
        <DatePanel markFocused />
      ]}
       

  />

        <button type="submit" style={{ marginLeft: '20px' }}>Add Event</button>
      </form></div>

      <Calendar
      showMultiDayTimes

      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
    />
    </div>
  );
}


