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
    window.location.reload();
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
      .then(res => res.json());
  }

  render() {
    return (
      <div >
        <form className='row-sm mb-3 d-flex' onSubmit={this.handleSubmit}>
          <div className='col-xs  d-flex title-schedule'>
            <input type="text" placeholder="Add Title" name="title" className='add-calendar-schedule' value={this.state.title} required onChange={this.handleTitle} />
          </div>
          <div className='col-xs bg-none mx-2'>
            <DtPicker
        className=""
        type="range"
        local="en"
        placeholder='Select Date/Time'
        withTime={true}
        showTimeInput={true}
        showWeekend
        autoClose={false}
        fromLabel='From'
        toLabel='To'
        onChange={this.setDate} />
          </div>
          <div className='col-xs'>
            <button type="submit" className='btn btn-info  mx-1' value="Submit" onClick={this.reload}>Schedule</button>
          </div>
        </form>
      </div>
    );
  }
}
IonDate.contextType = AppContext;
