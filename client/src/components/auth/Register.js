import React, { useState } from "react";
import axios from "axios";
import Login from "./Login";
import classnames from "classnames";
// import logo from "../../images/Moviemaniac1.jpg";

function Register() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
  });

  const [finalFields, setFinalFields] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
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

    setFinalFields({
      name: fields.name,
      email: fields.email,
      password: fields.password,
      password2: fields.password2,
      errors: fields.errors,
    });

    axios
      .post("/users/register", finalFields)
      .then((res) => console.log(res.data))
      .catch((err) => setFinalFields({ errors: err.response.data }));
  }

  const { errors } = finalFields;

  return (
    // <body className="text-center">
    // <main className="form-signin">

    <div className="text-center form-signin">
      <form onSubmit={submit}>
        <img className="mb-4" alt="" width="72" height="72" />

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

        {errors.email && <div className="invalid-feedback">{errors.name}</div>}

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

export default Register;
