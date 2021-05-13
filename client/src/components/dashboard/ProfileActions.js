import React from "react";
import { Link } from "react-router-dom";

function ProfileActions() {
  return (
    <div>
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
    </div>
  );
}

export default ProfileActions;
