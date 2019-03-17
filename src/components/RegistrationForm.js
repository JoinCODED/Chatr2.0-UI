import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions/index";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";

class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    const urlType = this.props.match.url.substring(1);
    e.preventDefault();
    if (urlType === "login") {
      return this.props.login(this.state, this.props.history);
    }
    this.props.signup(this.state, this.props.history);
  };

  render() {
    const urlType = this.props.match.url.substring(1);

    return (
      <div className="row ">
        <div className="col-12 text-center">
          <img src={logo} style={{ width: 100 }} />
          <h1>Slack Me</h1>
        </div>
        <div className="col-12">
          <div className="card mx-auto p-0 mt-5 form-format">
            <div className="card-body my-3">
              <form onSubmit={this.submitHandler}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={this.changeHandler}
                  />
                  <i class="sicon-user text-muted text-bottom" />
                </div>
                <div className="form-group my-4 ">
                  <input
                    className="form-control form-field-format"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={this.changeHandler}
                  />
                </div>
                <input
                  className="btn btn-light btn-block button-color"
                  type="submit"
                  value={urlType.replace(/^\w/, c => c.toUpperCase())}
                />
              </form>
            </div>

            <div className="card-footer text-center">
              <Link
                to={urlType === "login" ? "/signup" : "/login"}
                className="btn btn-small btn-link"
              >
                {urlType === "login"
                  ? "Register an account"
                  : "Have an account? Log in"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (userData, history) =>
      dispatch(actionCreators.login(userData, history)),
    signup: (userData, history) =>
      dispatch(actionCreators.signup(userData, history))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RegistationForm);
