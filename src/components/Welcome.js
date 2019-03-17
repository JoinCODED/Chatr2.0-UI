import React, { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <header className="masthead d-flex mt-5">
        <div className="container">
          <div className="card">
            <div className="card-header text-right">
            <h3>Name of Channels</h3>
            </div>
            <div className="card-body">
              <span className="float-right"> msag 1</span><br/>
              <span className="float-left"> msag 2</span>
            </div>
            <div className="input-group pr-1 pl-1 pb-1">
            <input type="text" className="form-control" placeholder="mssg" aria-label="mssg" aria-describedby="basic-addon2"/>
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">@example.com</span>
            </div>
          </div>
        </div>
        </div>
        <div className="overlay z-0" />
      </header>
    );
  }
}

export default Welcome;
/*
          <h1 className="mb-1">WELCOME TO CHATR</h1>
      <h3 className="mb-5">
            <em>You're gonna need to login to see the messages</em>
          </h3>
          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link>*/