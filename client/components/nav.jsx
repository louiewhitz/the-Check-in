import React from 'react';

import AppContext from '../lib/app-context';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Header extends React.Component {
  // static contextType = UserContext;  // ryan put this here
  render() {
    const { user, handleSignOut } = this.context;
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
                      <a className="dropdown-item" href="">
                        Home
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#timeline">
                        Timeline
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#addform">
                        Add event
                      </a>
                    </li>

                    <li>
                      <a className="dropdown-item" href="#scheduling">
                        Schedule Event
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#calendar">
                        Calendar
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#viewphoto">
                        View Photos
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#sign-in">
                        Sign Up
                      </a>
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
                <div>
                  {user !== null && (
                    <button className="btn btn-dark" onClick={handleSignOut}>
                      Sign out
                      <i className="ms-2 fas fa-sign-out-alt" />
                    </button>
                  )}
                  {user === null && (
                    <>
                      <a href="#sign-in" className="btn btn-primary">
                        Sign In
                      </a>
                      <a href="#sign-up" className="btn btn-dark">
                        Sign Up
                      </a>
                    </>
                  )}
                </div>
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
}
Header.contextType = AppContext;
