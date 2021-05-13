import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { createProfile } from "../../actions/profileActions";

function CreateProfile(props) {
  const [fields, setFields] = useState({
    name: "",
    favGenres: [],
    favMoviesAndSeries: [],
    bio: "",
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
    props.createProfile(fields, props.history);
  }

  return (
    <div className="create-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
            {/* <small className="d-block pb-3">* = required fields</small> */}
            <form noValidate className="form-signin" onSubmit={submit}>
              <TextFieldGroup
                name="name"
                type="name"
                placeholder="Name"
                info="Enter a cool name"
                value={fields.name}
                onChange={changing}
              />

              <TextFieldGroup
                name="favGenres"
                type="favGenres"
                placeholder="Fav Genres"
                info="Genres you're into, so visitor can get your little flavor (Use comma as separator)"
                value={fields.favGenres}
                onChange={changing}
              />

              <TextFieldGroup
                name="favMoviesAndSeries"
                type="favMoviesAndSeries"
                placeholder="Favorite Movies and Series"
                value={fields.favMoviesAndSeries}
                info="Share top ones from your playlist."
                onChange={changing}
              />

              <textarea
                name="bio"
                type="bio"
                placeholder="Bio"
                className="form-control gap"
                value={fields.bio}
                onChange={changing}
                info="Write a cool bio to standout in case anyone visits you!"
              />
              <button className="w-100 bt btn btn-lg btn-info" type="submit">
                Update ME!
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
//We need to wrap the component which are exporting with withRouter.
export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
