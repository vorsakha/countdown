import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/event";

import Spinner from "../layout/Spinner";

import "./CreateEvent.css";

const CreateEvent = ({
  createProfile,
  history,
  getCurrentProfile,
  setToggle,
  event: { loading },
}) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
  });

  const { name, date } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProfile(formData, history, true);
    getCurrentProfile();
    setToggle(false);
  };

  return (
    <div className="create-event">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h4>Enter name and date of the event</h4>
          <form className="form" onSubmit={(e) => handleSubmit(e)} action="">
            <div className="form-group">
              <input
                type="text"
                placeholder="Event Name"
                name="name"
                value={name}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="datetime-local"
                placeholder="Event Date"
                name="date"
                value={date}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <input type="submit" className="btn main" />
          </form>
        </Fragment>
      )}
    </div>
  );
};

CreateEvent.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  CreateEvent
);
