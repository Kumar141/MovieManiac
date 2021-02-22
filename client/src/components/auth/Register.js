import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import logo from "../../images/Moviemaniac1.jpg";
import TextFieldGroup from "../common/TextFieldGroup";

function Register(props) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    // errors: {},
  });

  const [error, setErrors] = useState({ errors: {} });

  function changing(event) {
    const { name, value } = event.target;

    setFields((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
    }
  });

  useEffect(() => {
    if (props.errors) {
      setErrors({ errors: props.errors });
    }
  }, [props.errors]);

  function submit(event) {
    event.preventDefault();
    console.log(fields);
    //registerUser is an action.
    props.registerUser(fields, props.history); //committed an action to register user and sends data (see authActions.js)
  }

  const { errors } = error;

  //Grabbed the user from auth prop which we've declared at line 147.
  // const { user } = props.auth;

  return (
    /*     <body className="text-center">
    <main className="form-signin">

    <div className="text-center form-signin">
      <form onSubmit={submit}>

        <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
    <img className="mb-4" src={logo} alt="" width="72" height="72" /> */

    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your MovieManiac account</p>

            <form noValidate onSubmit={submit}>
              <TextFieldGroup
                name="name"
                type="name"
                placeholder="Name"
                value={fields.name}
                fieldErrors={errors.name}
                onChange={changing}
                autofocus
              />

              <TextFieldGroup
                name="email"
                type="email"
                placeholder="Email"
                value={fields.email}
                fieldErrors={errors.email}
                onChange={changing}
              />

              <TextFieldGroup
                name="password"
                type="password"
                id="inputPassword"
                placeholder="Password"
                value={fields.password}
                fieldErrors={errors.password}
                onChange={changing}
              />

              <TextFieldGroup
                name="password2"
                type="password"
                id="inputPassword"
                placeholder="Enter Password again"
                value={fields.password2}
                fieldErrors={errors.password2}
                onChange={changing}
              />
              <button className="w-100 bt btn btn-lg btn-info" type="submit">
                Sign me UP!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

//Setting auth as a prop.
const mapStateToProps = (state) => ({
  //accessing data present in redux store.
  auth: state.auth, //So we could access auth by using props.auth.name or whatever.
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
