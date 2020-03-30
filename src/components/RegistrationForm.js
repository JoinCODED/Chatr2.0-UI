import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { login, signup } from "../redux/actions";
import { connect } from "react-redux";
import SuperSecretPage from "./SuperSecretPage";
class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.props.match.url.substring(1) === "login")
      this.props.login(this.state);
    else this.props.signup(this.state);
  };

  render() {
    const type = this.props.match.url.substring(1);
    if (this.props.user) return <SuperSecretPage />; // <Redirect to="/" />;  Redirect To User Page
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
const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => ({
  login: userData => dispatch(login(userData)),
  signup: userData => dispatch(signup(userData))
});
export default connect(mapStateToProps, mapDispatchToProps)(RegistationForm);
