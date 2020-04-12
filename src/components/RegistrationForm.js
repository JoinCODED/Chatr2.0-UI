import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup, login } from "../redux/actions";
import signupPic from "../assets/images/signup.png"
import loginPic from "../assets/images/login.png"
class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    const type = this.props.match.url.substring(1);
    e.preventDefault();

    if (type === "login") {
      this.props.login(this.state, this.props.history);
    } else {
      this.props.signup(this.state, this.props.history);
    }
  };

  render() {
    const type = this.props.match.url.substring(1);

    if (this.props.user) return <Redirect to="/" />;
    const errors = this.props.errors;

    return (
      <div className="card col-6 mx-auto p-0 mt-5"
        style={{
          background: "rgba(255, 255, 255, 0.71)",
        }}>
        <div className="card-body">
          <h5 className="card-title mb-4">
            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          <form onSubmit={this.submitHandler}>
            {!!errors.length && (
              <div className="alert alert-danger" role="alert">
                {errors.map(error => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
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
            <button id="btnlog"
              type="submit"
              className=" btn "
              style={{ width: "30%", height: "30%" }}>
              {type === "login" ? <img type="submit" src={loginPic} style={{ width: "100%", height: "100%" }} />
                : <img src={signupPic} style={{ width: "100%", height: "100%" }} />}
            </button>
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
    user: state.user,
    errors: state.errors.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: (userData, history) => dispatch(signup(userData, history)),
    login: (userData, history) => dispatch(login(userData, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistationForm);
