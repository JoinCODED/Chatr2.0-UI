import React, { Component } from "react";
import { Link } from "react-router-dom";
import { registerForm } from "../redux/actions/authentication";
import { connect } from "react-redux";
import { resetErrors } from "../redux/actions/errors";

class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  componentWillUnmount = () => {
    this.props.resetErrors();
  };

  componentDidUpdate = previousProps => {
    if (
      this.props.match.url.substring(1) !== previousProps.match.url.substring(1)
    )
      this.props.resetErrors();
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    const type = this.props.match.url.substring(1);

    this.props.registerForm(this.state, this.props.history, type);
  };

  render() {
    const type = this.props.match.url.substring(1);
    const errors = this.props.errors;
    console.log(errors);
    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <h5 className="card-title mb-4">
            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          <form onSubmit={this.submitHandler}>
            <div className="form-group">
              <input
                className={`form-control ${errors.username && "is-invalid"}`}
                type="text"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={this.changeHandler}
              />
              <div className="invalid-feedback">{errors.username}</div>
            </div>
            <div className="form-group">
              <input
                className={`form-control ${errors.non_field_errors &&
                  errors.non_field_errors &&
                  "is-invalid"}`}
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.changeHandler}
              />
              <div className="invalid-feedback">{errors.non_field_errors}</div>
            </div>
            <input
              className="btn btn-primary"
              type="submit"
              value={type.replace(/^\w/, c => c.toUpperCase())}
            />
          </form>
        </div>
        <div className="card-footer">
          <Link
            to={type === "login" ? "/signup" : "/login"}
            className="btn btn-small btn-link"
          >
            {type === "login"
              ? "register an account"
              : "login with an existing account"}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};
const mapDispatchToProps = dispatch => {
  return {
    registerForm: (userData, history, type) =>
      dispatch(registerForm(userData, history, type)),
    resetErrors: () => dispatch(resetErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistationForm);
