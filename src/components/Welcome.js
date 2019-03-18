import React, { Component } from "react";
import { Link } from "react-router-dom";

import background from "../assets/images/background.svg";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

class Welcome extends Component {
  render() {
    return (
      <header className="masthead my-4 d-flex">
        <div className="container  text-center my-auto z-1">
          <br />
          <br />
          <img src={background} style={{ width: 300 }} />
          <br />
          <br />
          <br />
          <br />
          <h1>
            Welcome to our awesome chat{" "}
            <span>
              {" "}
              <FontAwesomeIcon className="heart" icon={faHeart} />
            </span>
          </h1>

          {!this.props.user && (
            <div>
              <h3 className="mb-5">
                <em>you have to login to access the channels</em>
              </h3>
              <Link to="/login" className="btn btn-light btn-lg button-color">
                Login
              </Link>
            </div>
          )}
        </div>
        <div className="overlay z-0" />
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
