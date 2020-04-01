import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Welcome = ({ user }) => (
  <div>
    <header className="masthead d-flex">
      {!user ? (
        <div className="container text-center my-auto z-1">
          <center>
            <h1 className="mb-1"> Welcome to our Chatter</h1>
            <Link to="/login" className="btn btn-primary btn-lg">
              Login
            </Link>
          </center>
        </div>
      ) : (
        <div className="container text-center my-auto z-1">
          <center>
            <h1 className="mb-1">WELCOME TO CHATR</h1>
            <h3 className="mb-5">
              <em>You're gonna need to login to see the messages</em>
            </h3>
          </center>
          <form>
            <textarea
              type="email"
              className="form-control mt-5"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </form>
          <center>
            {" "}
            <button type="submit" className="btn btn-primary btn-lg mt-3">
              {" "}
              Send{" "}
            </button>
          </center>
        </div>
      )}
    </header>
    <div className="form-group container"></div>
  </div>
);

const mapStateToProps = ({ user }) => ({
  user
});
export default connect(mapStateToProps)(Welcome);
