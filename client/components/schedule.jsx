import React from 'react';
import { IoCalendarSharp } from 'react-icons/io5';

export default class ScheduleButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.handleSchedule = this.handleScheduled.bind(this);
    this.state = {
      isClicked: false,
      target: null
    };
  }

  handleSchedule(event) {
    this.setState({
      isClicked: true,
      target: this.event.target
    });
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    if (!this.state.isClicked) {
      return null;
    } else {
      return (
        <div className="col text-start">
          <div className="col text-start">
            <IoCalendarSharp
              size={200}
              style={{ fill: 'purple' }}
              onClick={this.handleSchedule()}
            />
          </div>
        </div>
      );
    }
  }
}
