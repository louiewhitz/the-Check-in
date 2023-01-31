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

  handleSubmit = async event => {
    event.preventDefault();
    const { user } = this.context;
    const startDate = this.state.start.from;
    const endDate = this.state.end.to;
    const endYear = endDate.year;
    const endDay = endDate.day;
    const endMonth = endDate.month - 1;
    const endMinute = endDate.minute;
    const endHour = endDate.hour;
    const end = new Date(endYear, endMonth, endDay, endHour, endMinute);
    const startYear = startDate.year;
    const startDay = startDate.day;
    const startMonth = startDate.month - 1;
    const startMinute = startDate.minute;
    const startHour = startDate.hour;
    const start = new Date(startYear, startMonth, startDay, startHour, startMinute);
    const timelineId = this.state.timelineId;
    const title = this.state.title;
    const body = { title, start, end, timelineId };
    try {
      const res = await fetch('/api/schedules/schedule-time', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': localStorage.getItem('auth-token')
        },
        user,
        body: JSON.stringify(body)
      });
      const data = await res.json();
      this.setState({
        loading: false,
        data
      });
      window.location.hash = '#calendar';
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className='container-md mx-0 px-0 justify-content-center'>
        <form className='row-sm mb-3 d-flex ' onSubmit={this.handleSubmit}>
          <div className='col  d-flex title-schedule '>
            <input type="text" placeholder="Title" name="title" className='add-calendar-schedule shadow' value={this.state.title} required onChange={this.handleTitle} />

          </div>
          <div className='col bg-white mx-1 shadow rounded '>
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
          <div className='col d-flex'>
            <button type="submit" className='btn btn-info btn-md shadow text-dark px-1 ml-3 ' value="Submit" onClick={this.reload}>SCHEDULE</button>
          </div>
        </form>
      </div>
    );
  }
}
IonDate.contextType = AppContext;
