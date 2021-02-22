import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../actions/authActions";

import logo from "../../images/Moviemaniac1.jpg";
import TextFieldGroup from "../common/TextFieldGroup";

function Login(props) {
  const [fields, setFields] = useState({
    email: "",
    password: "",
    // errors: {},
  });

  const [error, setErrors] = useState({ errors: {} });

  useEffect(() => {
    if (props.errors) {
      setErrors({ errors: props.errors });
    }
  }, [props.errors]);

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
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

  const { errors } = error;

  return (
    // <body className="text-center">
    // <div className="text-center">
    //   <img className="mb-4" src={logo} alt="" width="72" height="72" />
    //   <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign In</h1>

            <form noValidate className="form-signin" onSubmit={submit}>
              <TextFieldGroup
                name="email"
                type="email"
                id="inputEmail"
                placeholder="Email Address"
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

              <button className="w-100 bt btn btn-lg btn-info" type="submit">
                Log In!
              </button>
            </form>
            {/* <p className="mt-5 mb-3 text-muted">&copy; 2017-2021</p> */}
          </div>
        </div>
      </div>
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
