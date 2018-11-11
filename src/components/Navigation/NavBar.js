import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";

class NavBar extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        id="mainNav"
      >
        <Link className="navbar-brand" to="/welcome">
          Chatr2.0
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          {this.props.user && <SideNav />}
          <AuthButton />
        </div>
      </nav>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(NavBar);
