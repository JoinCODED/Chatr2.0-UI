import React, { Component } from "react";
import { Link } from "react-router-dom";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

// Components
import SideNav from "./SideNav";
import logo from "../logo.png";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class NavBar extends Component {
  render() {
    return (
      <div className="col-4 nav-style " style={{ maxHeight: 700 }}>
        <div className="row">
          <div className="col-12 my-3">
            <Link className="navbar-brand" to="/welcome">
              <div>
                <img src={logo} style={{ width: 30 }} />
              </div>
            </Link>
            <a onClick={() => this.props.logout()}>
              {" "}
              <span>Logout</span>
              <span>
                {"       "}
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
            </a>
          </div>
        </div>
        <SideNav />
      </div>
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
)(NavBar);
