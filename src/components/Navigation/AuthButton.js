import React, { Component } from "react";
import { Link } from "react-router-dom";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";


import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/index";


class AuthButton extends Component {

  
  // this function is just for testing, when needed 
  handleLogout = () => {
    this.props.logout()
    console.log("handlelogout => user: ", this.props.user)
  }


  render() {
    const { user } = this.props;
    console.log("zerodebug => user logged in: ", user)
    let buttons = (
      <li className="nav-item">
        <span onClick={() => this.props.logout()} className="nav-link">
          <FontAwesomeIcon icon={faSignOutAlt} /> logout
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
        <span className="navbar-text">{user ? user.username : ""}</span>
        {buttons}
      </ul>
    );
  }
}



const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.logout())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthButton);
