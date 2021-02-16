import React, { useState } from "react";
import axios from "axios";
// import logo from "../../images/Moviemaniac1.jpg";

function Login() {
  const [field, setField] = useState({
    email: "",
    password: "",
  });

  const [finalField, setFinalField] = useState({
    email: "",
    password: "",
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
    });

    axios
      .post("/users/login", finalField)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  }

  return (
    // <body className="text-center">
    <div className="text-center">
      <form className="form-signin" onSubmit={submit}>
        <img className="mb-4" alt="" width="72" height="72" />

        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>

        <input
          name="email"
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          onChange={changing}
          value={field.email}
          autoFocus
        />

        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>

        <input
          name="password"
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          onChange={changing}
          value={field.password}
        />

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
