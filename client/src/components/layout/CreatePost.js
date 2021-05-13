import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

function CreatePost() {
  const [posts, setPosts] = useState({
    image: "",
    title: "",
    description: "",
  });

  let history = useHistory();

  function changing(event) {
    const { name, value } = event.target;

    setPosts((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  }

  function submit(event) {
    event.preventDefault();

    axios
      .post("/posts", posts)
      .then((res) => history.push("/posts"))
      .catch((err) => console.log(err.response.data));
  }

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Post</h1>
            <p className="lead text-center">
              Make a description for you Movie.
            </p>

            <form noValidate onSubmit={submit}>
              <label for="exampleFormControlInput1">Title </label>

              <TextFieldGroup
                name="title"
                type="name"
                placeholder="Title of Movie/Series"
                id="exampleFormControlInput1"
                value={posts.name}
                onChange={changing}
              />

              <label for="exampleFormControlInput">Enter Image of URL: </label>

              <TextFieldGroup
                name="image"
                type="name"
                placeholder="Image URL"
                id="exampleFormControlInput"
                value={posts.name}
                onChange={changing}
              />

              <label for="exampleFormControlInput2">Description </label>

              <TextFieldGroup
                name="description"
                type="name"
                placeholder="Description"
                id="exampleFormControlInput2"
                value={posts.name}
                onChange={changing}
              />

              <button className="w-100 bt btn btn-lg btn-info" type="submit">
                Create It!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
