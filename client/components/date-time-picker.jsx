import React from 'react';
import AppContext from '../lib/app-context';
import DtPicker from 'react-calendar-datetime-picker';
import 'react-calendar-datetime-picker/dist/index.css';
export default class IonDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: new Date(),
      end: new Date(),
      networkError: false,
      timelineId: 1,
      title: ''
    };
    this.setDate = this.setDate.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reload = this.reload.bind(this);
  }

  setDate(date) {
    this.setState({
      start: date,
      end: date
    });
  }

  handleTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  reload() {
    if (window.location.pathname === '#calendar') {
      window.location.reload();
    } else {
      window.location.hash = '#calendar';
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user } = this.context;
    const startDate = this.state.start.from;
    const endDate = this.state.end.to;
    const endYear = endDate.year;
    const endDay = endDate.day;
    const endMonth = endDate.month;
    const endMinute = endDate.minute;
    const endHour = endDate.hour;
    const endFin = `${endYear}/${endMonth}/${endDay} ${endHour}:${endMinute}`;
    const startYear = startDate.year;
    const startDay = startDate.day;
    const startMonth = startDate.month;
    const startMinute = startDate.minute;
    const startHour = startDate.hour;
    const startFin = `${startYear}/${startMonth}/${startDay} ${startHour}:${startMinute}`;
    const momentStart = new Date(startFin);
    const momentEnd = new Date(endFin);
    const end = momentEnd.toISOString();
    const newStart = new Date(momentStart);
    const start = newStart.toISOString();
    const timelineId = this.state.timelineId;
    const title = this.state.title;
    const body = { title, start, end, timelineId };

    fetch('/api/schedules/schedule-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('auth-token')
      },
      user,
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(() => {
        this.setState({ loading: false });
        window.location.hash = '#calendar';
      });
  }

  render() {
    return (
      <div className=''>
        <form className=' mb-3 d-flex ' onSubmit={this.handleSubmit}>
          <div className='col-sm  d-flex title-schedule '>
            <input type="text" placeholder="Title" name="title" className='add-calendar-schedule shadow' value={this.state.title} required onChange={this.handleTitle} />

          </div>
          <div className='col bg-white mx-1 shadow rounded position-relative'>
            <DtPicker
        className=""
        type="range"
        local="en"
        placeholder='Date/time'
        withTime={true}
        showTimeInput={true}
        showWeekend
        autoClose={false}
        fromLabel='From'
        toLabel='To'
        anchorTo='bottom'
        onChange={this.setDate} />
          </div>
          <div className='col d-flex  '>
            <button type="submit" className='btn btn-info btn-md shadow text-dark px-1 ml-3 ' value="Submit" onClick={this.reload}>SCHEDULE</button>
          </div>
        </form>
      </div>
    );
  }
}
IonDate.contextType = AppContext;
