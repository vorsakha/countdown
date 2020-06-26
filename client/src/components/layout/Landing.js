import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Landing.css";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <section className="landing-header">
        <div className="img-overlay">
          <div className="inner-landing">
            <h1>Countdown</h1>
            <p>Create countdowns for your upcoming big dates</p>
            <div className="buttons">
              <Link className="btn-sign" to="/register">
                Sign up
              </Link>
              <Link className="btn-login" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="landing-body">
        <div className="description">
          <h3>Accumsan sed tempus</h3>
          <div className="icon">
            <i className="fas fa-glass-cheers"></i>
          </div>
          <p>
            Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci
            porttitor.
          </p>
          <hr />
        </div>
        <div className="description">
          <h3>Accumsan sed tempus</h3>
          <div className="icon">
            <i className="fas fa-birthday-cake"></i>
          </div>
          <p>
            Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci
            porttitor.
          </p>
          <hr />
        </div>
        <div className="description">
          <h3>Accumsan sed tempus</h3>
          <div className="icon">
            <i className="fas fa-gifts"></i>
          </div>
          <p>
            Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci
            porttitor.
          </p>
          <hr />
        </div>
        <div className="description">
          <h3>Accumsan sed tempus</h3>
          <div className="icon">
            <i className="fas fa-ring"></i>
          </div>
          <p>
            Feugiat accumsan lorem eu ac lorem amet accumsan donec. Blandit orci
            porttitor.
          </p>
        </div>
      </section>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
