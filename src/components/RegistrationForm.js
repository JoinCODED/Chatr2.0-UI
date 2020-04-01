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
    /*
     * This code can be simplified and shortened by combining
     * the two actions into one.
     * See the authentications.js action file for more details on this.
     */
    if (this.props.match.url.substring(1) === "login")
      this.props.login(this.state);
    else this.props.signup(this.state);
  };

  render() {
    // Feel free to remove the commented block of code for displaying the errors
    // if the way you're doing it now works
    const errors = this.props.errors;
    const type = this.props.match.url.substring(1);
    if (this.props.user) return <Redirect to="/private" />; // <Redirect to="/" />;  Redirect To User Page
    return (
      <div className="card col-6 mx-auto p-0 mt-5">
        <div className="card-body">
          <h5 className="card-title mb-4">
            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          {/* {!!this.props.errors.length && (
            <div className="alert alert-danger" role="alert">
              {this.props.errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )} */}
          <form onSubmit={this.submitHandler}>
            <div className="form-group ">
              <input
                className={`form-control ${errors.username && "is-invalid"}`}
                type="text"
                placeholder="Username"
                name="username"
                onChange={this.changeHandler}
              />
              <div className="invalid-feedback">{errors.username}</div>
            </div>
            <div className="form-group">
              <input
                className={`form-control ${errors.password && "is-invalid"}`}
                type="password"
                placeholder="Password"
                name="password"
                onChange={this.changeHandler}
              />
              <div className="invalid-feedback">{errors.password}</div>
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

const mapStateToProps = ({ user, errors }) => ({ user, errors });
const mapDispatchToProps = dispatch => ({
  login: userData => dispatch(login(userData)),
  signup: userData => dispatch(signup(userData))
  // setErrors: () => dispatch(setErrors())
});
export default connect(mapStateToProps, mapDispatchToProps)(RegistationForm);
