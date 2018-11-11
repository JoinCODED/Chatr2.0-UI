import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";
import { Redirect } from "react-router-dom";

class RegistationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler(e) {
    e.preventDefault();
    if (this.props.match.url.substring(1) === "login")
      this.props.login(this.state, this.props.history);
    else this.props.signup(this.state, this.props.history);
  }

  render() {
    const { username, password } = this.state;

    const type = this.props.match.url.substring(1);
    if (this.props.user) {
      return <Redirect to="/private" />;
    }
    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <h5 className="card-title mb-4">
            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          {this.props.errors.non_field_errors && (
            <div className="alert alert-danger" role="alert">
              {this.props.errors.non_field_errors}
            </div>
          )}
          <form onSubmit={this.submitHandler} noValidate>
            {/* {this.props.error && (
              <div className="alert alert-danger" role="alert">
                {this.props.error}
              </div>
            )} */}
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                name="username"
                required
                onChange={this.changeHandler}
              />
              {this.props.errors.username && (
                <div className="text-danger">{this.props.errors.username}</div>
              )}
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={this.changeHandler}
              />
              {this.props.errors.password && (
                <div className="text-danger">{this.props.errors.password}</div>
              )}
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
            // onClick={() => (authStore.errors = [])}
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
const mapStateToProps = state => ({
  errors: state.errors,
  user: state.auth.user
});
const mapDispatchToProps = dispatch => {
  return {
    login: (form, history) => dispatch(actionCreators.login(form, history)),
    signup: (form, history) => dispatch(actionCreators.signup(form, history)),
    checkToken: () => dispatch(actionCreators.checkForExpiredToken())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistationForm);
