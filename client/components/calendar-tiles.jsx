/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

// import Toolbar from 'react-big-calendar/lib/Toolbar';
// import moment from 'moment';
// import AppContext from '../lib/app-context.js';
// import { Col, Card } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import DatePicker from 'react-multi-date-picker';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import moment from 'moment';

import TimePicker from 'react-multi-date-picker/plugins/time_picker';

import 'react-big-calendar/lib/css/react-big-calendar.css';
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
// const timezeone = require('moment-timezone');
const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

function MyCalendar() {

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date(), timelineId: 1 });
  const [submit, setSubmitted] = useState(false);

  function handleAddEvent(events, newEvent) {
    newEvent.start = moment(newEvent.start).format('YYYY-MM-DD HH:mm');
    newEvent.end = moment(newEvent.end).format('YYYY-MM-DD HH:mm');
    newEvent.startDate = moment(newEvent.start).format('YYYY-MM-DD HH:mm');

    // console.log(newEvent);

    setNewEvent([...events, newEvent]);

  }

  // function handleTitle(event) {
  //   setTitle();
  // }

  const handleSubmit = e => {

    // const thisEvent = { newEvent };

    const formatStart = moment(newEvent.start).format('YYYY-MM-DD HH:mm:ss');

    const formatEnd = moment(newEvent.end).format('YYYY-MM-DD HH:mm:ss');
    // console.log('file: calendar-tiles.jsx:56 ~ handleSubmit ~ formatEn', formatEnd);
    const body = {
      timelineId: 1,
      title: newEvent.title.value,
      start: formatStart,
      end: formatEnd
    };
    // console.log('file: calendar-tiles.jsx:62 ~ handleSubmit ~ body', body);

    setSubmitted(true);
    fetch('/api/schedules/schedule-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      // .then(result => console.log(result))

      .then(() => {

        window.location.hash = '#calendar';
      })
      .catch(err => {
        console.error('Dang! Fetch FAIIIIILED', err);

      });

  };

  useEffect(() => {

    fetch('/api/schedules', {
      headers: {
        'X-Access-Token': localStorage.getItem('auth-token')
      }
    })
      .then(response => response.json())
      .then(data => {
        const events = data;

        data.map(event => ({
          startDate: new Date(event.startDate),
          start: new Date(event.startDate + event.startTime),

          end: new Date(event.startDate + 'T' + event.startTime),
          title: event.title,
          timelineId: event.timelineId,
          scheduleId: event.scheduleId,
          startTime: moment(event.startTime, 'HH:mm:ss'),
          endTime: moment(event.endTime, 'HH:mm:ss')

        }));

        setEvents(events);

      });

  }, []);

  return (

    <div className='calendarApp'>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Add Title" name="title" id="title" style={{ width: '20%', marginRight: '10px' }} value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
          <DatePicker placeholderText="start Date" style={{ marginRight: '10px' }} selected={newEvent.start} onChange={start => setNewEvent({ ...newEvent, start })} />
          <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={end => setNewEvent({ ...newEvent, end })} />
          <button style={{ marginTop: '10px' }} onClick={handleAddEvent} type="submit" value="Submit">Add Event</button>
        </form>
      </div>
      <Calendar
      localizer={localizer}
      events={events}
      showMultiDayTimes

      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </div>
  );
}

export default MyCalendar;
