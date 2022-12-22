/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import { FaUserNurse, FaPhoneAlt } from 'react-icons/fa';
import { IoMdPeople, IoMdRestaurant } from 'react-icons/io';
import { BiCameraMovie } from 'react-icons/bi';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import axios from 'axios';
// import LoadingSpinner from '../components/loading-spinner';
// import NetErr from '../components/network-error';

export default function ScheduleMe(props) {
  const [date, setStartDate] = useState(new Date());


  const [eventTypeId, setEventTypeId] = useState(0);
  const [title, setTitle] = useState('');

  const handletitle = event => {
    setTitle(event.target.value);
  };
  console.log('file: datepicker.jsx:23 ~ handletitle ~ title', title);

  const handleChange = date => {
    setStartDate(date);

  };
  console.log('file: datepicker.jsx:30 ~ handleChange ~ date', date);

  const eventType = number => {

    setEventTypeId(number);
    return setEventTypeId(number);
  };

  function handleSubmit(event) {
    event.preventDefault();

    console.log(title);
    console.log(date);
    const request = {
      scheduleTime: date,
      title
    };
    console.log('file: datepicker.jsx:45 ~ handleSubmit ~ request', request);

    const headers = {
      'X-Access-Token': localStorage.getItem('auth-token'),
      'Content-Type': 'multipart/form-data'
    };

    axios.post('/api/schedules', request, headers)

      .then(response => {
        console.log('response status', response.status);
        console.log('response data', response.data);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          console.log('server responded');
        } else if (error.request) {
          console.log('network error');
        } else {
          console.log(error);
          console.error('this is your error', error);
        }
      });

  }

  const { user } = useContext(AppContext);

  if (!user) {
    return <Redirect to="#sign-in" />;
  }

  return (
    <div className="container-md mx-auto">
      <div className="row d-flex justify-content-center align-items-center flex-wrap">
        <div className="col-sm" />
        <div className="col d-flex d-inline-flex align-self-center">
          <blockquote className="blockquote text-center">
            <p className="timeline-color lead fs-3 lh-base text-center">
              Schedule a future event:
            </p>
          </blockquote>
        </div>
        <div className="col-sm" />
      </div>
      <form className="row" id="scheduleId" onSubmit={handleSubmit}>
        <div className="form-holder">
          <div className="form-content">
            <div className="">
              <div className="col d-flex justify-content-evenly flex-wrap">
                <button
                  className="circle-one btn btn-hover border rounded-circle btn-active d-flex p-2"
                  data-set={eventTypeId}
                  onClick={() => eventType(1)}>
                  <IoMdPeople
                    size={60}
                    style={{ fill: 'pink' }}
                    type="button"
                    className="pb-1"
                  />
                </button>
                <button
                  className="circle-three btn btn-hover border rounded-circle btn-active d-flex p-1"
                  data-set={eventTypeId}
                  onClick={() => eventType(2)}>
                  <BiCameraMovie
                    // i highly doubt this works
                    size={60}
                    style={{ fill: '#FFA500' }}
                    type="button"
                    className="ps-1"
                  />
                </button>
                <button
                  className="circle-four border btn btn-hover border-3 rounded-circle btn-active d-flex p-2"
                  data-set={eventTypeId}
                  onClick={() => eventType(3)}>
                  <FaPhoneAlt
                    size={47}
                    style={{ fill: 'green' }}
                    type="button"
                    className="pt-1"
                  />
                </button>
                <button
                  className="circle-five btn-active btn-hover border btn border-3 rounded-circle btn-active d-flex p-2"
                  data-set={eventTypeId}
                  onClick={() => eventType(4)}>
                  <IoMdRestaurant
                    name="eventTypeId"
                    size={50}
                    style={{ fill: '#52003a' }}
                    type="button"
                  />
                </button>
                <button
                  className="circle-two btn-hover border btn-active rounded-circle btn-active d-flex p-2"
                  data-set={eventTypeId}
                  onClick={() => eventType(5)}>
                  <FaUserNurse
                    size={50}
                    style={{ fill: '#00008B' }}
                    type="button"
                    onClick={() => eventType(5)}
                  />
                </button>
                <button
                  className="circle-six btn btn-hover border rounded-circle btn-active d-flex justify-content-center align-items-center"
                  onClick={() => eventType(6)}>
                  <p className="font-bold fs-4 pt-3 fw-bold otherText text-warning">
                    Other
                  </p>
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col justify-content-evenly">
                <div className="mb-3">
                  <div className="form-group col mt-3">
                    <label
                      htmlFor="title"
                      className="d-block fs-5 form-label"
                    />
                    <input
                      id="title"
                      required
                      name="title"
                      type="text"
                      onChange={handletitle}
                      value={title}
                      placeholder="Title..."
                      className="form-control rounded bg-transparent px-4 py-2.5 font-bold text-heading text-dark"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col justify-content-evenly">
                    <div className="mb-3">
                      <div className="form-group col mt-3">
                        <label
                          htmlFor="date"

                        />
                        <div className='calendar-container'>
                          <Calendar calendarType='US'
                            selected={date}
                            value={date}
                            onChange={handleChange}

                            id="date"
                            name="date"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary btn-md mt-2 shadow-lg" type="submit">
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
