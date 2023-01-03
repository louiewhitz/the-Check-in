/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import IonDate from './ionDate';

// import Toolbar from 'react-big-calendar/lib/Toolbar';
// import moment from 'moment';
// import AppContext from '../lib/app-context.js';
// import { Col, Card } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import { Calendar, dateFnsLocalizer, Views, DateLocalizer  } from 'react-big-calendar';
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



// const start = moment(schedules.startDate).toDate();

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

function MyCalendar() {

  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: '', startTime: '', endTime: '', timelineId: 1 });
  const [submit, setSubmitted] = useState(false);

  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent(events, newEvent) {
    setAllEvents({ ...allEvents, newEvent });
   

    console.log(newEvent);
  }

  useEffect(() => {

    fetch('/api/schedules', {
      headers: {
        'X-Access-Token': localStorage.getItem('auth-token')
      }
    })
      .then(response => response.json())
      .then(data => {
        const allEvents = data;
        setAllEvents(allEvents);

      });

  }, []);

  const {views, ...otherProps} = useMemo(() => ({
    views: {
        month: true,
        agenda: true
    }
}), [])

  return (

    <div className='calendarApp row-sm'>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <IonDate />
     
      <Calendar
      defaultDate={new Date()}

      localizer={localizer}
      events={allEvents }
       onNavigate={(date, view) => {

    fetch('/api/schedules', {
      headers: {
      method: 'POST',
      'X-Access-Token': localStorage.getItem('auth-token')
     
      },
       body: JSON.stringify({ date, view })
    })
      .then(response => response.json())
      .then(data => {
        const allEvents = data;
        allEvents.map(event => {
          const startTime = event.start;
          const endTime = event.end;
          const title = event.title;
          const start = new Date(startTime);
          const end = new date(endTime);
  
          // do something with the start and end time here
        });
  
        setAllEvents(allEvents);
      });
  }}
      
      showMultiDayTimes
      allDay={false}
  //      onSelectEvent={function noRefCheck(){}}
  // onSelectSlot={function noRefCheck(){}}
  selectable
  step={60}
  timeslots={4}
  views={views}
  popup

      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
    </div>
  );
}

export default MyCalendar;
