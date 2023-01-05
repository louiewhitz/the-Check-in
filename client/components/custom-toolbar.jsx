import React, { Component } from 'react';
import AppContext from '../lib/app-context.js';

const navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT'

};

class CustomToolbar extends Component {
  render() {
    // const { localizer: { messages } } = this.props;
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" className="btn btn-control" onClick={this.navigate.bind(null, navigate.PREVIOUS)}><i className="fa fa-arrow-left" /> Prev</button>
        </span>
        <span className="rbc-btn-group">
          <button type="button" className="btn btn-control" onClick={this.navigate.bind(null, navigate.NEXT)}>Next <i className="fa fa-arrow-right" /></button>
        </span>
      </div>
    );
  }

  navigate = action => {
    this.props.onNavigate(action);
  };
}

CustomToolbar.contextType = AppContext;

export default { CustomToolbar };
