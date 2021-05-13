import React, { useEffect, Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getProfileById } from "../../actions/profileActions";
import { getProfileByName } from "../../actions/profileActions";

// function Profile(props) {
//   useEffect(() => {
//     if (props.match.params.user_id) {
//       props.getProfileById(props.match.params.user_id);
//       console.log("Reached!!!");
//     }
//   });

//   return <div></div>;
// }

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.user_id) {
      this.props.getProfileById(this.props.match.params.user_id);
    }
  }
  return;
}

// class Profile extends Component {
//   componentDidMount() {
//     if (this.props.match.params.name) {
//       this.props.getProfileByName(this.props.match.params.name);
//     }
//   }
//   return;
// }

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  // getProfileById: PropTypes.func.isRequired,
  getProfileByName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
