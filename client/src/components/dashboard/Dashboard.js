import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";

function Dashboard(props) {
  const { profile, loading } = props.profile;
  const { user } = props.auth;

  function deleteIt(event) {
    props.deleteAccount();
  }

  useEffect(() => {
    props.getCurrentProfile();
  }, []);

  let dashBoardContent;

  if (profile === null || loading) {
    dashBoardContent = <Spinner />;
  } else {
    // Check if login user has profile data
    if (Object.keys(profile).length > 0) {
      dashBoardContent = (
        <div>
          <p className="lead text-muted">
            {/* Welcome <Link to={`/profile/${user.id}`}>{user.name}</Link> */}
            Welcome <Link to={`/profile/${user.name}`}>{user.name}</Link>
          </p>
          <ProfileActions />
          <div style={{ marginBottom: "60px" }} />
          <button onClick={deleteIt} className="btn btn-danger">
            Delete My Account
          </button>
        </div>
      );
    } else {
      dashBoardContent = (
        <div>
          <p className="lead text-muted">Welcome {user.name}</p>
          <p>You haven't yet set up a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashBoardContent}
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

//To bring properties from redux
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
