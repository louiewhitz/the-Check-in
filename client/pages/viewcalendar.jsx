import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import axios from 'axios';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
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

export default class ViewCalendar extends React.Component {

  render() {
    return (
      <div>
        <Calendar
          onSelectEvent={this.handleEventSelection}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>

    );
  }
}
