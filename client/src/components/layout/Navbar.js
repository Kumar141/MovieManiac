import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

function Navbar(props) {
  const { isAuthenticated, user } = props.auth;

  function onLogoutClick(event) {
    event.preventDefault();
    props.clearCurrentProfile();
    props.logoutUser();
  }

  const authLinks = (
    <ul className="navbar-nav ml-auto side">
      <li className="nav-item">
        <Link className="nav-link" to="/createpost">
          <i class="fas fa-plus"></i>
          Create-Post
        </Link>
      </li>
      <li className="nav-item">
        <a href="#" onClick={onLogoutClick} className="nav-link">
          <img
            className="rounded-circle"
            style={{ width: "25px", marginRight: "10px", marginLeft: "40px" }}
            src={user.avatar}
            alt={user.name}
          />
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto side">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="" alt="" />
          <i class="fas fa-file-video"></i>
          {/* <i class="fas fa-video"></i> */}
          MovieManiac
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
