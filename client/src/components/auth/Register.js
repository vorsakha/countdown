import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { createProfile } from "../../actions/event";
import PropTypes from "prop-types";

import "./Register.css";

const Register = ({
  setAlert,
  register,
  isAuthenticated,
  createProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password do not match", "danger", 2000);
    } else {
      await register({ name, email, password });
      createProfile(
        { name: "Registered on Countdown", date: new Date() },
        history
      );
    }
  };

  if (isAuthenticated) return <Redirect to={"/dashboard"} />;

  return (
    <div className="register">
      <h1 className="register-title">Sign Up</h1>
      <form
        className="register-form"
        action=""
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            value={email}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            required
            value={password2}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <input type="submit" className="btn-submit" value="Register" />
        <p>
          Already have an account?{" "}
          <Link className="link" to="/login">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert, createProfile })(
  Register
);
