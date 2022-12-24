import React, { useState, useEffect } from 'react';

// import Toolbar from 'react-big-calendar/lib/Toolbar';
// import moment from 'moment';
// import AppContext from '../lib/app-context.js';
// import { Col, Card } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';

import 'react-big-calendar/lib/css/react-big-calendar.css';
// import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

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
  // const [newEvent, setNewEvent] = useState({title: '', start: '', end: ''});
  // const [allEvents, setAllevents] = useState(events);

  // const handleNavigation = (date, view, action) => {
  //   console.log(date, view, action);
  // it returns current date, view options[month,day,week,agenda] and action like prev, next or today
  // };
  // const views = ['day', 'week', 'month', 'agenda'];

  useEffect(() => {

    fetch('/api/schedules', {
      headers: {
        'X-Access-Token': localStorage.getItem('auth-token')
      }
    })
      .then(response => response.json())
      .then(data => {
        const events = data;

        // console.log('dtata', data);
        data.map(event => ({
          start: new Date(event.startDate),
          end: new Date(event.startDate),
          title: event.title,
          timelineId: event.timelineId,
          scheduleId: event.scheduleId
        }));
        // console.log('file: calendar-tiles.jsx:76 ~ schedules ~ schedules', events);
        // Convert the schedules to the format expected by react-big-calendar

        setEvents(events);
      });

  }, []);

  return (
    <div className='calendarApp'>
      <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </div>
  );
}

export default MyCalendar;
