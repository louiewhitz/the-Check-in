import React from 'react';
import { FaUserNurse, FaPhoneAlt } from 'react-icons/fa';
import { IoMdPeople, IoMdRestaurant } from 'react-icons/io';
import { BiCameraMovie } from 'react-icons/bi';

export default function EventType(props) {
  const eventTypeId = props.eventTypeId;
  switch (eventTypeId) {
    case 1:
      return (
        <span className="date walk">
          <span>
            <IoMdPeople
              size={60}
              style={{ fill: 'pink' }}
              className="db-bolck"
            />
          </span>
        </span>
      );
    case 2:
      return (
        <span className="date movie">
          <span>
            <BiCameraMovie
              size={60}
              style={{ fill: '#FFA500' }}
              className="ps-1"
            />
          </span>
        </span>
      );

    case 3:
      return (
        <span className="date phone">
          <span>
            <FaPhoneAlt
              size={47}
              style={{ fill: 'green' }}
              className="db-block mt-2"
            />
          </span>
        </span>
      );

    case 4:
      return (
        <span className="date meal">
          <span>
            <IoMdRestaurant
              name="eventTypeId"
              size={50}
              style={{ fill: '#52003a' }}
            />
          </span>
        </span>
      );
    case 5:
      return (
        <span className="date doctor">
          <span>
            <FaUserNurse size={50} style={{ fill: '#00008B' }} />
          </span>
        </span>
      );
    case 6:
      return (
        <span className="date other btn-hover">
          <span>
            <span className="font-bold fs-4 text-warning db-block text-center mt-2">
              Other
            </span>
          </span>
        </span>
      );

    default:
      return (
        <div className="inner mb-5">
          <span className="missed-day text-center">
            <span className="mt-4 bg" />
          </span>
        </div>
      );
  }
}
