import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actionCreators from "./store/actions";
import { connect } from "react-redux";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import { from } from "rxjs";

class AuthButton extends Component {
  render() {
    const { user } = this.props;
    // const user = { username: "Mr Potato" };
    let buttons = (
      <li className="nav-item">
        <span className="nav-link">
          <button
            className="btn btn-danger"
            onClick={() => this.props.logout()}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            {this.props.user.username}
          </button>
        </span>
      </li>
    );

    if (!user) {
      buttons = [
        <li key="loginButton" className="nav-item">
          <Link to="/login" className="nav-link">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
        </li>,
        <li key="signupButton" className="nav-item">
          <Link to="/signup" className="nav-link">
            <FontAwesomeIcon icon={faUserPlus} /> Signup
          </Link>
        </li>
      ];
    }

    return (
      <ul className="navbar-nav ml-auto">
        <span className="navbar-text">{user.username}</span>
        {buttons}
      </ul>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout())
});

const mapStateToProps = state => ({
  user: state.auth.user
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButton);
