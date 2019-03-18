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
            <div className="row mx-1">
              <div className="col-4">
                <div>
                  <Link className="navbar-brand" to="/welcome">
                    <img src={logo} style={{ width: 40 }} />
                  </Link>
                </div>
              </div>
              <div className="col-8 text-right">
                <button
                  onClick={() => this.props.logout()}
                  className="custom-logout-btn"
                >
                  {" "}
                  <span>Logout</span>
                  <span>
                    {"       "}
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </span>
                </button>
              </div>
            </div>
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
