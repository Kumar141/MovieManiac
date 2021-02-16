import React, { useState } from "react";
import axios from "axios";
import Login from "./Login";
// import logo from "../../images/Moviemaniac1.jpg";

function Register() {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [finalFields, setFinalFields] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
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
    });

    console.log(finalFields);
    // console.log(fields);

    axios
      .post("/users/register", finalFields)
      .then(() => console.log("Updated"))
      .catch((err) => console.log(err.response.data));
  }

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
          className="form-control top"
          placeholder="Name"
          onChange={changing}
          value={fields.name}
          autoFocus
        />

        <input
          name="email"
          type="email"
          className="form-control bottom"
          placeholder="Email"
          onChange={changing}
          value={fields.email}
        />

        <input
          name="password"
          type="password"
          className="form-control bottom"
          placeholder="Password"
          onChange={changing}
          value={fields.password}
        />

        <input
          name="password2"
          type="password"
          className="form-control bottom"
          placeholder="Enter Password again"
          onChange={changing}
          value={fields.password2}
        />

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
