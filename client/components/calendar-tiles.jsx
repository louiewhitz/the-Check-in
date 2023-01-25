
import React, { useState, useEffect, useMemo, useContext } from 'react';
import AppContext from '../lib/app-context.js';
import IonDate from './date-time-picker';

import 'react-calendar/dist/Calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

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
  const { user } = useContext(AppContext);
  const [events, setEvents] = useState([]);

  const [allEvents, setAllEvents] = useState(events);

  useEffect(() => {
    fetch('/api/schedules', {
      headers: {
        'X-Access-Token': localStorage.getItem('auth-token')
      }
    })
      .then(response => response.json())
      .then(data => {

        const allEvents = data.map(event => {
          return {
            ...event,
            start: new Date(event.start),
            end: new Date(event.end)
          };
        });
        setAllEvents(allEvents);
      });

  }, []);

  const { views } = useMemo(() => ({
    views: {
      month: true,
      week: true,
      day: true,
      agenda: true
    }
  }), []);

  function addEvent(event) {
    const newEvents = [...allEvents, event];

    setEvents(newEvents);
  }

  return (

    <div className='calendarApp'>
      <h1 className='timeline-color'>Calendar</h1>
      <h2 className='mb-3 timeline-color'>Add New Event</h2>
      <IonDate />
      <Calendar
       formats={{
         timeGutterFormat: (date, culture, dateFnsLocalizer) =>
           date.getMinutes() > 0
             ? ''
             : dateFnsLocalizer.format(
               date,
               'h a',
               culture
             ),
         dayFormat: 'ddd'
       }}

      defaultDate={new Date()}
      components={{ CustomToolbar }}
      addEvent={addEvent}
      localizer={localizer}
      events={allEvents}
      navigate={false}
      showMultiDayTimes
      allDay={false}
      selectable={true}
      step={60}
      timeslots={4}
      views={views}
      popup
      startAccessor="start"
      endAccessor="end"
      user={user}
      style={{ height: 700 }}
    />
    </div>
  );
}

function CustomToolbar(toolbar) {
  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('prev');
  };

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('next');
  };

  const goToCurrent = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('current');
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span><b>{date.format('MMMM')}</b><span> {date.format('YYYY')}</span></span>
    );
  };

  return (
    <div className={Calendar['toolbar-container']}>
      <label className={Calendar['label-date']}>{label()}</label>
      <div className={Calendar['back-next-buttons']}>
        <button className={Calendar['btn-back']} onClick={goToBack}>&#8249;</button>
        <button className={Calendar['btn-current']} onClick={goToCurrent}>today</button>
        <button className={Calendar['btn-next']} onClick={goToNext}>&#8250;</button>
      </div>
    </div >
  );
}

export default MyCalendar;
