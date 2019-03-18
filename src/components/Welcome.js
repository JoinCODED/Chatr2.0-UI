import React, { Component } from "react";
import { Link } from "react-router-dom";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

class Welcome extends Component {
  render() {
    console.log("zerodebug => welcome => user:", this.props.user);
    return (
      <header className="masthead my-4 d-flex">
        <div className="container  text-center my-auto z-1">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          {!this.props.user ? (
            <div>
              <h3 className="mb-5">
                <h1>Login to access owr awesome channels</h1>
              </h3>
              <Link to="/login" className="btn btn-light btn-lg button-color">
                Login
              </Link>
            </div>
          ) : (
            <h1>
              Welcome to our awesome chat{" "}
              <span>
                {" "}
                <FontAwesomeIcon className="heart" icon={faHeart} />
              </span>
            </h1>
          )}
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Welcome);
