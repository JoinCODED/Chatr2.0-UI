import React, { Component } from "react";
import { observer } from "mobx-react";
import { withRouter } from "react-router-dom";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

// Stores
import authStore from "../../stores/authStore";

class AuthButton extends Component {
  render() {
    let buttons;

    if (authStore.isLoggedIn) {
      buttons = (
        <li
          className="nav-item"
          onClick={() => this.props.history.push("/welcome")}
        >
          <a
            className="nav-link"
            data-toggle="modal"
            data-target="#logoutModal"
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </a>
        </li>
      );
    } else {
      buttons = [
        <li key="loginButton" className="nav-item">
          <a className="nav-link" data-toggle="modal" data-target="#loginModal">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </a>
        </li>,
        <li key="signupButton" className="nav-item">
          <a
            className="nav-link"
            data-toggle="modal"
            data-target="#signupModal"
          >
            <FontAwesomeIcon icon={faUserPlus} /> Signup
          </a>
        </li>
      ];
    }

    return (
      <ul className="navbar-nav ml-auto">
        <span className="navbar-text">{authStore.currentUser}</span>
        {buttons}
      </ul>
    );
  }
}

export default withRouter(observer(AuthButton));
