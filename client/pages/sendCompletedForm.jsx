import React from 'react';
import { FaUserNurse, FaPhoneAlt } from 'react-icons/fa';
import { IoMdPeople, IoMdRestaurant } from 'react-icons/io';
import { BiCameraMovie } from 'react-icons/bi';

export default class AddForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      summary: '',
      eventTypeId: null,
      file: '../images/apod.jpeg',
      title: ''
    };
    this.fileInputRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.eventType = this.eventType.bind(this);
  }

  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onFileChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  eventType(number) {
    this.setState({ eventTypeId: number });
    return this.number;
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    const image = this.fileInputRef.current.files[0];
    formData.append('summary', this.state.summary);
    formData.append('eventTypeId', this.state.eventTypeId);

    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('image', image);
    fetch('/api/events', {
      method: 'POST',
      body: formData
    })
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch(err => console.error('Dang! Fetch FAIIIIILED', err));
  }

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
        <form className="row" id="eventId" onSubmit={this.handleSubmit}>
          <div className="form-holder">
            <div className="form-content">
              <div className="">
                <div className="col d-flex justify-content-evenly flex-wrap">
                  <button
                    className="circle-one btn btn-hover border rounded-circle btn-active d-flex p-2"
                    data-set={this.state.eventTypeId}
                    type="button"
                    onClick={() => this.eventType(1)}>
                    <IoMdPeople
                      size={60}
                      style={{ fill: 'pink' }}
                      className="pb-1"
                    />
                  </button>
                  <button
                    className="circle-three btn btn-hover border rounded-circle btn-active d-flex p-1"
                    data-set={this.state.eventTypeId}
                    type="button"
                    onClick={() => this.eventType(2)}>
                    <BiCameraMovie
                      size={60}
                      style={{ fill: '#FFA500' }}
                      className="ps-1"
                    />
                  </button>
                  <button
                    className="circle-four border btn btn-hover border-3 rounded-circle btn-active d-flex p-2"
                    data-set={this.state.eventTypeId}
                    type="button"
                    onClick={() => this.eventType(3)}>
                    <FaPhoneAlt
                      size={47}
                      style={{ fill: 'green' }}
                      className="pt-1"
                    />
                  </button>
                  <button
                    className="circle-five btn btn-active btn-hover border btn  rounded-circle btn-active d-flex p-2"
                    data-set={this.state.eventTypeId}
                    type="button"
                    onClick={() => this.eventType(4)}>
                    <IoMdRestaurant
                      name="eventTypeId"
                      size={50}
                      style={{ fill: '#52003a' }}
                    />
                  </button>
                  <button
                    className="circle-two btn-hover border btn-active rounded-circle btn-active d-flex p-2"
                    data-set={this.state.eventTypeId}
                    type="button"
                    onClick={() => this.eventType(5)}>
                    <FaUserNurse
                      size={50}
                      style={{ fill: '#00008B' }}
                      // onClick={() => eventType(5)}
                    />
                  </button>
                  <button
                    className="circle-six btn btn-hover border rounded-circle btn-active d-flex justify-content-center align-items-center"
                    onClick={() => this.eventType(6)}
                    type="button"
                    data-set={this.state.eventTypeId}>
                    <p className="font-bold fs-4 pt-3 fw-bold otherText text-warning">
                      Other
                    </p>
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col form-group pt-2">
                  <label htmlFor="other" className="d-block fs-5 form-label" />
                  <input
                    id="summary"
                    name="summary"
                    type="text"
                    onChange={this.onChange}
                    value={this.state.summary}
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
                    onChange={this.onChange}
                    value={this.state.title}
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
                    id="description"
                    name="description"
                    onChange={this.onChange}
                    value={this.state.description}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col justify-content-evenly">
                  <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">
                      image
                    </label>
                    <input
                      className="form-control text-white-50 bg-dark"
                      type="file"
                      id="formFile"
                      name="photoUrl"
                      ref={this.fileInputRef}
                      onChange={this.state.onFileChange}
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
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
