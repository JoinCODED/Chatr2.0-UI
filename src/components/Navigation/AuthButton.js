import React, { Component } from "react";
import { Link } from "react-router-dom";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

class AuthButton extends Component {
  render() {
     //const { user } = this.props;
    const user = {username: "Fahad"} ;
    let buttons = (
      <li className="nav-item">
        <span className="nav-link">
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
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
        <span className="navbar-text">{user && user.username }</span>
        {buttons}
      </ul>
    );
  }
}

export default AuthButton;
