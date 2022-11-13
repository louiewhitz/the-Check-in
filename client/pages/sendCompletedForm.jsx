import React, { useRef } from 'react';
import { FaUserNurse, FaPhoneAlt } from 'react-icons/fa';
import { IoMdPeople, IoMdRestaurant } from 'react-icons/io';
import { BiCameraMovie } from 'react-icons/bi';
export default class AddForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      otherDesc: '',
      eventId: null,
      eventTypeId: null,
      photoUrl: '',
      title: ''
    };
    this.eventType = this.eventType.bind(this);
    this.setEventName = this.setEventName.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.enterTypeClick = this.enterTypeClick.bind(this);
  }

  eventType(number) {
    const setEventTypeId = number => {
      return number;
    };
  }

  // setTitle(e.target.value);
  // setComment(e.target.value);
  // setOther(e.target.value);
  // setImage(e.target.value); // event is defined in handler rather than setThing. Wont show up here as defined
  // setValues(e.target.value);
  // }, [eventTypeId, title, comment, other, photo, value]);

  // const eventType = number => {
  //   console.log(number);
  //   return setEventTypeId(number);
  // };

  // const name = string => {
  //   console.log(string);
  //   return setEventName(string);
  // };

  // const handleCommentChange = e => {
  //   setComment(e.target.value);
  //   console.log(comment);
  // };

  // const handleTitle = e => {
  //   setTitle(e.target.value);
  //   console.log(title);
  // };

  // const handleOther = e => {
  //   setOther(e.target.value);
  //   console.log(e.target.value);
  // };
  // const fileInputRef = useRef();
  // const handleFile = () => {
  //   setImage(fileInputRef.current.files[0]);
  // };

  handleSubmit = e => {
    if (e) {
      console.log(e);
      e.preventDefault();
      if (eventTypeId === 0) {
        setEventClick(false);
        return;
      }

      setEventClick(true);
      seteventId(eventId + 1);

      const image = fileInputRef.current.files[0];
      console.log('image', image);
      const nameofEvent = eventName;
      console.log('nameofEvent', nameofEvent);
      const eventType = eventTypeId;
      console.log('eventType ', eventType);
      const description = comment;
      console.log('description', description);
      const newTitle = title;
      console.log('newTitle', newTitle);
      const summary = other;
      console.log('summary ', summary);
      const id = eventId;
      console.log('id', eventId);
      setValues({
        ...value,
        photo: image,
        title,
        description: comment,
        summary: other,
        eventType: eventTypeId,
        eventId: id,
        nameEvent: eventName
      });

      // sealues([...value, newFormData]);
    }
  };

  // const formData = new FormData();
  // formData.append('formData', newFormData);
  // const method = {
  //   method: 'POST',
  //   body: formData
  // };

  // fetch('api/events', method)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data);
  //     useState(newFormData)
  //   })
  render() {
    return (
      <div className="container-md mx-auto">
        <div className="row d-flex justify-content-center align-items-center flex-wrap">
          <div className="col-sm" />
          <div className="col d-flex d-inline-flex align-self-center">
            <blockquote className="blockquote text-center">
              <p className="text-white lead fs-3 lh-base text-center">
                Showcase your event, reset your timer, make a difference
              </p>
            </blockquote>
          </div>
          <div className="col-sm" />
        </div>
        <form className="row" id="eventId" onSubmit={handleSubmit}>
          <div className="form-holder">
            <div className="form-content">
              <div className="">
                <div className="col d-flex justify-content-evenly flex-wrap">
                  <div
                    className="circleOne btn btn-hover border rounded-circle btn-active d-flex p-2"
                    onClick={() => name('walk')}
                    name={eventName}>
                    <IoMdPeople
                      size={60}
                      style={{ fill: 'pink' }}
                      className="pb-1"
                      onClick={() => this.eventType(1)}
                      name={this.getEvent}
                    />
                  </div>
                  <div
                    className="circleThree btn btn-hover border rounded-circle btn-active d-flex p-1"
                    onClick={() => name('movie')}
                    name={eventName}>
                    <BiCameraMovie
                      size={60}
                      style={{ fill: '#FFA500' }}
                      className="ps-1"
                      onClick={() => eventType(2)}
                      value={eventTypeId}
                    />
                  </div>
                  <div
                    className="circleFour border btn btn-hover border-3 rounded-circle btn-active d-flex p-2"
                    // onClick={() => name('phone')}
                    name={eventName}>
                    <FaPhoneAlt
                      size={47}
                      style={{ fill: 'green' }}
                      className="pt-1"
                      // onClick={() => eventType(3)}
                      // value={eventTypeId}
                    />
                  </div>
                  <div
                    className="circleFive btn-active btn-hover border btn border-3 rounded-circle btn-active d-flex p-2"
                    onClick={() => name('meal')}
                    name={eventName}>
                    <IoMdRestaurant
                      size={50}
                      style={{ fill: '#52003a' }}
                      onClick={() => eventType(4)}
                      value={eventTypeId}
                    />
                  </div>
                  <div
                    className="circleTwo btn-hover border btn btn-active rounded-circle btn-active d-flex p-2"
                    onClick={() => name('doctor')}
                    name={eventName}>
                    <FaUserNurse
                      size={50}
                      style={{ fill: '#00008B' }}
                      onClick={() => eventType(5)}
                      value={eventTypeId}
                    />
                  </div>
                  <div
                    className="circleSix btn btn-hover border rounded-circle btn-active d-flex justify-content-center align-items-center"
                    onClick={() => eventType(6)}
                    value={eventTypeId}>
                    <p
                      className="font-bold fs-4 pt-3 fw-bold otherText text-warning"
                      onClick={() => name('other')}
                      name={eventName}>
                      Other
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col form-group pt-2">
                  <label htmlFor="other" className="d-block fs-5 form-label" />
                  <input
                    id="other"
                    name="other"
                    type="text"
                    onChange={handleOther}
                    value={other}
                    placeholder="Other...."
                    className="form-control rounded mt-3 bg-transparent px-4 py-2.5 text-light"
                  />
                </div>
                <div className="form-group col mt-3">
                  <label htmlFor="title" className="d-block fs-5 form-label" />
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
                <div className="col form-group mt-3">
                  <label
                    htmlFor="comment"
                    className="fs-5 form-label text-muted">
                    Optional notes you think everyone should know
                  </label>
                  <textarea
                    className="form-control border-2 border-muted-2 bg-transparent px-4 py-2.5 text-light"
                    rows="5"
                    id="comment"
                    name="comment"
                    onChange={handleCommentChange}
                    value={comment}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col justify-content-evenly">
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      Default file input example
                    </label>
                    <input
                      className="form-control text-white-50 bg-dark"
                      type="file"
                      id="formFile"
                      name="photo"
                      onChange={handleFile}
                      ref={fileInputRef}
                      accept=".png, .jpg, .jpeg, .gif"
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary btn-md mt-2"
                      type="submit">
                      POST TO TIMELINE
                    </button>
                  </div>
                </div>
                {!enterTypeClick && (
                  <p className="text-warning">Please choose an event type</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
