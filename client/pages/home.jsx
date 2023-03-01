import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import { IoAddCircle, IoCalendarSharp } from 'react-icons/io5';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class HomeBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    if (!this.context.user) {
      return <Redirect to="sign-in" />;
    }
  }

  render() {
    const { user } = this.context;
    if (!user) {
      return <Redirect to="sign-in" />;
    }
    return (
      <div className="container">
        <div className="container">
          <h1 className="timeline-color text-center me-4">Add your event,</h1>
          <h2 className="timeline-color text-center ms-5">get the ball rolling</h2>
        </div>

        <div className="row d-flex justify-content-evenly">

          <div className="col text-end">
            <OverlayTrigger
                    placement="top"

                    overlay={<Tooltip>Add an Event</Tooltip>}>

              <a href="#addform">

                <IoAddCircle size={200} className="icon-shadow"/>

              </a>
            </OverlayTrigger>

          </div>

          <div className="col text-start">
            <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Schedule an Event</Tooltip>}>
              <a href="#calendar">
                <IoCalendarSharp size={200} className="icon-shadow" />
              </a>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    );
  }
}

HomeBase.contextType = AppContext;
