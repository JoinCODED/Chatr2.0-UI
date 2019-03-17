import React, { Component } from "react";
import { Link } from "react-router-dom";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

// Components
import SideNav from "./SideNav";
import logo from "../logo.png";

class NavBar extends Component {
  render() {
    return (
      <div className="col-4 nav-style">
        <div className="row">
          <div className="col-12 my-3">
            <Link className="navbar-brand" to="/welcome">
              <div>
                <img src={logo} style={{ width: 30 }} />
              </div>
            </Link>
            <span> Logout</span>
            <span>
              {"       "}
              <FontAwesomeIcon icon={faSignOutAlt} />
            </span>
          </div>
        </div>
        <SideNav />
      </div>
    );
  }
}

export default NavBar;
