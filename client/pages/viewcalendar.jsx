import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import LoadingSpinner from '../components/loading-spinner';
import NetError from '../components/network-error';
export default class ViewCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      title: '',
      startTime: '',
      endTime: '',
      timelineId: 1,
      start: '',
      end: '',
      loading: false,
      networkError: false
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDateChange(date) {
    const formatted = moment(date).format('YYYY-MM-DD');
    this.setState({

      end: formatted,
      start: formatted
    });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleStartTimeChange(event) {
    const momentStart = moment(event.target.value, ' HH:mm');
    const formattedStart = momentStart.format('YYYY-MM-DD HH:mm:ss');

    this.setState({ startTime: formattedStart });
  }

  handleEndTimeChange(event) {
    const momentEnd = moment(event.target.value, 'HH:mm');
    const formattedEnd = momentEnd.format('YYYY-MM-DD HH:mm:ss');

    this.setState({ endTime: formattedEnd });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ loading: true });

    fetch('/api/schedules/schedule-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': localStorage.getItem('auth-token')
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())

      .then(() => {
        this.setState({ loading: false });
        window.location.hash = '#calendar';
      })
      .catch(err => {
        console.error('Dang! Fetch FAIIIIILED', err);
        this.setState({ networkError: true });
      });

  }

  render() {

    const { user } = this.context;
    if (!user) {
      return <Redirect to="#sign-in" />;
    }

    if (this.state.loading) {
      return <LoadingSpinner />;
    }

    if (this.state.networkError) {
      return <NetError />;
    }

    return (
      <form id='scheduleId' onSubmit={this.handleSubmit}>
        <div className='container d-flex flex-column'>

          <div className='myCalendar container'>

            <div className='calendar-container'>
              <div className="row d-flex justify-content-center">
                <div className="col">
                  <input
          className='placeholderCal'
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}
          placeholder="Event title"
        />
                </div>
                <div className="col">
                  <label
                    htmlFor="startTime"
                    className="fs-5 form-label text-muted mg-cal">
                    Startime: {this.state.startTime}
                  </label>
                  <input
          type="time"
          className='calInput'
          value={this.state.startTime}
          onChange={this.handleStartTimeChange}
          placeholder="Start time"
        />
                </div>
                <div className="col">
                  <label
                    htmlFor="Endtime"
                    className="fs-5 form-label text-muted mg-cal">
                    Endtime: {this.state.endTime}
                  </label>
                  <input
          type="time"
          className='calInput'
          value={this.state.endTime}
          onChange={this.handleEndTimeChange}
          placeholder="End time"
        />
                </div>
              </div>
              <Calendar calendarType='US'
          selected={this.state.startDate}
          onChange={this.handleDateChange}
          id="date"
          name="date"
                          />
              <Button as="input" type="submit" value="Submit" className='date-buttons'/>
              <Button as="input" type="reset" value="Reset" className='btn-warning date-buttons'/>

              <div className='bubble'>
                <p className='paraDate'>Selected date: {this.state.startDate.toString()}</p>
                <p className='paraDate'>Event title: {this.state.title}</p>
                <p className='paraDate'>Start time: {this.state.startTime}</p>
                <p className='paraDate'>End time: {this.state.endTime}</p>
              </div>

            </div>

          </div>
        </div>

      </form>
    );
  }

}

ViewCalendar.contextType = AppContext;
