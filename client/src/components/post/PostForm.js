import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";

class PostForm extends Component {
  render() {
    return (
      <div>
        <div className="feed">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <PostForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostForm;
