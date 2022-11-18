import React, { useState, useContext } from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import { FaUserNurse, FaPhoneAlt } from 'react-icons/fa';
import { IoMdPeople, IoMdRestaurant } from 'react-icons/io';
import { BiCameraMovie } from 'react-icons/bi';

import DatePicker from 'react-datepicker';

// const initialValues = {
//   scheduleId: 0,
//   title: '',
//   startDate: 0,
//   timelineId: 1,
//   EventTypeId: 0
// };

const ScheduleMe = () => {
  const [date, setStartDate] = useState(new Date());

  const [eventTypeId, setEventTypeId] = useState(0);
  const [title, setTitle] = useState('');
  const { user } = useContext(AppContext);

  // const [value, setValues] = useState([]);
  // const [eventName, setEventName] = useState('');
  const handleDate = e => {
    setStartDate(e.target.value);
  };
  const handleTitle = e => {
    setTitle(e.target.value);
    // console.log(title);
  };

  const eventType = number => {
    // console.log(number);
    setEventTypeId(number);
    return setEventTypeId(number);
  };

  if (!user) {
    return <Redirect to="#sign-in" />;
  }

  return (
    <div className="container-md mx-auto">
      <div className="row d-flex justify-content-center align-items-center flex-wrap">
        <div className="col-sm" />
        <div className="col d-flex d-inline-flex align-self-center">
          <blockquote className="blockquote text-center">
            <p className="text-white lead fs-3 lh-base text-center">
              Schedule a future event:
            </p>
          </blockquote>
        </div>
        <div className="col-sm" />
      </div>
      <form className="row" id="eventId">
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
                      onChange={handleTitle}
                      value={title}
                      placeholder="Title..."
                      className="form-control rounded bg-transparent px-4 py-2.5 font-bold text-heading text-light"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col justify-content-evenly">
                    <div className="mb-3">
                      <div className="form-group col mt-3">
                        <label
                          htmlFor="date"
                          className="d-block fs-5 form-label"
                        />
                        <DatePicker
                          selected={date}
                          onSelect={handleDate}
                          onChange={date}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary btn-md mt-2" type="submit">
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
};

export default ScheduleMe;
