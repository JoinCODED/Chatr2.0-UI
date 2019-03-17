import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions/index";



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
      return this.props.login(this.state, this.props.history)
    }
    this.props.signup(this.state, this.props.history)
  };

  
  render() {
    const urlType = this.props.match.url.substring(1); 

    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <h5 className="card-title mb-4">
            {urlType === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.changeHandler}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.changeHandler}
              />
            </div>
            <input
              className="btn btn-primary"
              type="submit"
              value={urlType.replace(/^\w/, c => c.toUpperCase())}
            />
          </form>
        </div>
        <div className="card-footer">
          <Link
            to={urlType === "login" ? "/signup" : "/login"}
            className="btn btn-small btn-link"
          >
            {urlType === "login"
              ? "register an account"
              : "login with an existing account"}
          </Link>
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
      dispatch(actionCreators.signup(userData, history)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(RegistationForm);
