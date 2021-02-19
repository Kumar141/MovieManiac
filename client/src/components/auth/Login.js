import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../actions/authActions";

import logo from "../../images/Moviemaniac1.jpg";

function Login(props) {
  const [fields, setFields] = useState({
    email: "",
    password: "",
    errors: {},
  });

  // useEffect(() => {
  //   if (props.errors) {
  //     setFields({ errors: props.errors });
  //   }
  // }, [props.errors]);

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/posts");
    }
  });

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

    console.log(fields);

    props.loginUser(fields);
  }

  const { errors } = fields;

  return (
    // <body className="text-center">
    <div className="text-center">
      <form noValidate className="form-signin" onSubmit={submit}>
        <img className="mb-4" src={logo} alt="" width="72" height="72" />

        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <input
          name="email"
          type="email"
          id="inputEmail"
          className={classnames("form-control", {
            "is-invalid": errors.email,
          })}
          placeholder="Email address"
          onChange={changing}
          value={fields.email}
          autoFocus
        />

        {errors.email && <div className="invalid-feedback">{errors.email}</div>}

        <input
          name="password"
          type="password"
          id="inputPassword"
          className={classnames("form-control", {
            "is-invalid": errors.password,
          })}
          placeholder="Password"
          onChange={changing}
          value={fields.password}
        />

        {errors.password && (
          <div className="invalid-feedback">{errors.password}</div>
        )}

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
      <p className="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
      {/* // </body> */}
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
