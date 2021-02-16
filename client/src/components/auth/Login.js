import React, { useState } from "react";
import axios from "axios";
import classnames from "classnames";
// import logo from "../../images/Moviemaniac1.jpg";

function Login() {
  const [field, setField] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const [finalField, setFinalField] = useState({
    email: "",
    password: "",
    errors: {},
  });

  function changing(event) {
    const { name, value } = event.target;

    setField((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function submit(event) {
    event.preventDefault();

    setFinalField({
      email: field.email,
      password: field.password,
      errors: field.errors,
    });

    axios
      .post("/users/login", finalField)
      .then((res) => console.log(res.data))
      .catch((err) => setFinalField({ errors: err.response.data }));
  }

  const { errors } = finalField;

  return (
    // <body className="text-center">
    <div className="text-center">
      <form noValidate className="form-signin" onSubmit={submit}>
        <img className="mb-4" alt="" width="72" height="72" />

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
          value={field.email}
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
          value={field.password}
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

export default Login;
