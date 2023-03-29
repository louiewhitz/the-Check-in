import React from 'react';
import AppContext from '../lib/app-context';
import EventCreatedAt from './counter';
export default class Header extends React.Component {
  render() {
    const { user, handleSignOut } = this.context;
    return (
      <section className="mb-3 ">
        <nav className="navbar navbar-dark color-nav">
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
                        Add Event
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#calendar">
                        Scheduling & Calendar
                      </a>
                    </li>

                    <li>
                      <a className="dropdown-item" href="#allphotos">
                        View Photos
                      </a>
                    </li>

                    {/* <li>
                      <a className="dropdown-item" href="#timelines">
                        Add Timeline
                      </a>
                    </li> */}
                  </ul>

                </div>

              </div>
            </div>
            <div className="row pad-left">
              <div className='col'>

                <div className="card-body">
                  <blockquote className="blockquote mb-0 text-white">
                    <p className="timer-font"><EventCreatedAt /></p><footer className="blockquote-footer fs-6 light-purp">Since last post</footer>
                  </blockquote>
                </div>

              </div>
              <div className="col">

                <h1 className="text-center navbar-brand fs-1 fw-bold">
                  The Check-in
                </h1>
              </div>

            </div>
            <div className="row">
              <div className="col">
                <div>
                  {user !== null && (
                    <button className="btn btn-light bg-light" onClick={handleSignOut}>
                      Sign out
                      <i className="ms-2 fas fa-sign-out-alt" />
                    </button>
                  )}
                  {user === null && (
                    <>
                      <a href="#sign-in" className="btn btn-primary">
                        Sign In
                      </a>
                      <a href="#sign-up" className="btn btn-light">
                        Sign Up
                      </a>
                    </>
                  )}
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
