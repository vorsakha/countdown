import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentProfile,
  deleteAccount,
  deleteEvent,
} from "../../actions/event";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";
import CreateEvent from "./CreateEvent";
import Timer from "../timer/Timer";

import "./Dashboard.css";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  deleteEvent,
  auth: { user },
  event: { profile, loading },
}) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading || profile === null ? (
    <div className="dashboard">
      <Spinner />
    </div>
  ) : (
    <div className="dashboard">
      <img className="avatar" src={profile.user.avatar} alt="avatar" />
      <span>
        <i className="fas fa-user" /> {user && profile.user.name}
      </span>
      <h3>My Events</h3>
      <div>
        <span>Create an Event </span>
        {"  "}
        {toggle ? (
          <button className="round success" onClick={() => setToggle(!toggle)}>
            <i className="fas fa-minus"></i>
          </button>
        ) : (
          <button className="round success" onClick={() => setToggle(!toggle)}>
            <i className="fas fa-plus"></i>
          </button>
        )}
      </div>
      {toggle && <CreateEvent setToggle={setToggle} />}
      <div className="events">
        {profile.event.map((data) => (
          <div className="event-block" key={data._id}>
            <h4>
              <span className="text-bg">{data.name}</span>
            </h4>
            <p>{<Timer date={data.date} name={data.name} />}</p>
            <div className="btn-div">
              <button
                className="round danger"
                onClick={() => {
                  deleteEvent(data._id);
                  getCurrentProfile();
                }}
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button className="btn danger" onClick={() => deleteAccount()}>
          Delete My Account
        </button>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  event: state.event,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  deleteEvent,
})(Dashboard);
