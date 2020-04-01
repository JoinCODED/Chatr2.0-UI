import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

const AuthButton = ({ user, logout }) => {
  return user ? (
    <React.Fragment>
      <span className="navbar-text text-capitalize">
        Welcome, {user.username} !
      </span>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={logout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Link>
        </li>
      </ul>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <ul className="navbar-nav ml-auto">
        <li key="loginButton" className="nav-item">
          <Link to="/login" className="nav-link">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
        </li>
        <li key="signupButton" className="nav-item">
          <Link to="/signup" className="nav-link">
            <FontAwesomeIcon icon={faUserPlus} /> Signup
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
