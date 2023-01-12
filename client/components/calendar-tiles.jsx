
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react';
import IonDate from './date-time-picker';
import PropTypes from 'prop-types';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import 'react-calendar/dist/Calendar.css';
import { Calendar, dateFnsLocalizer, Views, DateLocalizer, Navigate } from 'react-big-calendar';
import DatePicker from 'react-multi-date-picker';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import moment from 'moment';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
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
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: '', startTime: '', endTime: '', timelineId: 1 });
  const [submit, setSubmitted] = useState(false);
  const [allEvents, setAllEvents] = useState(events);
  function handleAddEvent(events, newEvent) {
    setAllEvents({ ...allEvents, newEvent });
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

  const { views, ...otherProps } = useMemo(() => ({
    views: {
      month: true,
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
      defaultDate={new Date()}
      components={{ CustomToolbar }}
      addEvent={addEvent}
      localizer={localizer}
      events={allEvents }
      navigate={false}
      showMultiDayTimes
      allDay={false}
      selectable
      step={60}
      timeslots={4}
      views={views}
      popup
      startAccessor="start"
      endAccessor="end"
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
