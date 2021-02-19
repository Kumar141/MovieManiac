import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import logo from "../../images/Moviemaniac1.jpg";

function Register(props) {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  });

  useEffect(() => {
    if (props.errors) {
      setFields({ errors: props.errors });
    }
  }, [props.errors]);

  function changing(event) {
    const { name, value } = event.target;

    setFields((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function submit(event) {
    event.preventDefault();

    //registerUser is an action.
    props.registerUser(fields, props.history); //committed an action to register user and sends data (see authActions.js)
  }

  const { errors } = fields;

  //Grabbed the user from auth prop which we've declared at line 147.
  // const { user } = props.auth;

  return (
    // <body className="text-center">
    // <main className="form-signin">

    <div className="text-center form-signin">
      <form onSubmit={submit}>
        <img className="mb-4" src={logo} alt="" width="72" height="72" />

        <h1 className="h3 mb-3 fw-normal">Sign Up</h1>

        <input
          name="name"
          type="text"
          className={classnames("form-control top", {
            "is-invalid": errors.name,
          })}
          placeholder="Name"
          onChange={changing}
          value={fields.name}
          autoFocus
        />

        {errors.name && <div className="invalid-feedback">{errors.name}</div>}

        <input
          name="email"
          type="email"
          className={classnames("form-control bottom", {
            "is-invalid": errors.email,
          })}
          placeholder="Email"
          onChange={changing}
          value={fields.email}
        />

        {errors.email && <div className="invalid-feedback">{errors.email}</div>}

        <input
          name="password"
          type="password"
          className={classnames("form-control bottom", {
            "is-invalid": errors.password,
          })}
          placeholder="Password"
          onChange={changing}
          value={fields.password}
        />

        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}

        <input
          name="password2"
          type="password"
          className={classnames("form-control bottom", {
            "is-invalid": errors.password2,
          })}
          placeholder="Enter Password again"
          onChange={changing}
          value={fields.password2}
        />

        {errors.password2 && (
          <div className="invalid-feedback">{errors.password2}</div>
        )}

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign me UP!
        </button>

        {/* <p className="mt-5 mb-3 text-muted copy">&copy; MovieManiac</p> */}
      </form>
      {/* </main> */}
      {/* // </body> */}
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
