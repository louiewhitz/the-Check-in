import React from 'react';
import AppContext from '../lib/app-context';
import { format } from 'date-fns';

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
    }
    this.setDate = this.setDate.bind(this);
       this.handleTitle = this.handleTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
  }
  setDate(date) {
    
    this.setState({
      start: date,
      end: date
    })
     

  }

   handleTitle(e) {
    this.setState({
      title: e.target.value
    });

  }

   handleSubmit(event) {

    console.log(this.state);
    event.preventDefault();
    const { user } = this.context;
    const startDate = this.state.start.from;
   


    const endDate = this.state.end.to
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
    const momentStart = new Date(startFin) 

    const momentEnd = new Date(endFin)
    const end = momentEnd.toISOString();
  
    const newStart = new Date(momentStart);
    const start = newStart.toISOString();
    console.log("file: ionDate.jsx:85 ~ IonDate ~ handleSubmit ~ lastStart ", start );
   
    console.log("file: ionDate.jsx:64 ~ IonDate ~ handleSubmit ~ startFin", startFin);
    const timelineId = this.state.timelineId;
    const title = this.state.title;
    const body = { title, start, end, timelineId }
 
 
  console.log("file: ionDate.jsx:94 ~ IonDate ~ handleSubmit ~ body", body);



    console.log(this.state);

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

   }


 render() {
   console.log(this.state)

  return (
    <div>
      <form onSubmit={this.handleSubmit}>
       <input type="text" placeholder="Add Title" name="title" id="title" required style={{ width: '20%', marginRight: '10px' }} value={this.state.title} onChange={this.handleTitle} />

    <DtPicker
    type="range"
    local="en"
    placeholder='Select a date and time'
    withTime={true}
    showTimeInput={true}
    showWeekend
    autoClose={false}
    clearBtn={true}
    fromLabel='From'
      toLabel='To'
      
 
     onChange={this.setDate} /> 
     <div className='align-left'>
      <button style={{ marginTop: '10px' }}  type="submit" className='btn btn-primary' value="Submit">Add Event</button>
      </div>
         </form>
     </div>
    
  
  );
  }
}
IonDate.contextType = AppContext;
