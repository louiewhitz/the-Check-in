import React from 'react';
// import { Link } from 'react-router-dom';

// import DropdownNav from './dropdown';
import { LinkContainer } from 'react-router-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header(props) {
  return (
    <section className="mb-3">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="dropdown">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-controls="navbarToggleExternalContent10"
                  aria-expanded="false"
                  aria-haspopup="true"
                  aria-label="Toggle navigation">
                  <div className="animated-icon2">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <LinkContainer to="">
                      <a className="dropdown-item" href="#">
                        Home
                      </a>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/timeline">
                      <a className="dropdown-item" href="#">
                        Timeline
                      </a>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/addevent">
                      <a className="dropdown-item" href="#">
                        Add event
                      </a>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/addform">
                      <a className="dropdown-item" href="#">
                        Add form
                      </a>
                    </LinkContainer>
                  </li>
                  
                  <li>
                    <LinkContainer to="/scheduling">
                      <a className="dropdown-item" href="#">
                        Schedule Event
                      </a>
                    </LinkContainer>
                  </li>
                  <li>
                    <LinkContainer to="/calendar">
                      <a className="dropdown-item" href="/calendar">
                        Calendar
                      </a>
                    </LinkContainer>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h1 className="text-white text-center navbar-brand fs-1 fw-bold">
                The Check-in
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="timer border border-3 bg-light rounded-circle d-flex text-center">
                <span className="pt-2">0</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}
