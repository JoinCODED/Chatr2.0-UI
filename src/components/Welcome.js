import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Welcome = ({ user }) => {
  if (user) return <Redirect to="/private" />;
  return (
    <header className="masthead">
      <div className=" container text-center mt-5">
        <h1
          className="mb-1 text-dark"
          style={{ fontFamily: "Comic Sans MS", fontSize: 100 }}
        >
          WELCOME TO CHATR
        </h1>
        <h3
          className="mb-2 text-dark"
          style={{ fontFamily: "Franklin Gothic Medium" }}
        >
          <em>You're gonna need to login to see the messages</em>
        </h3>
        <Link
          to="/login"
          className="btn btn-outline-primary btn-lg"
          style={{ fontFamily: "Comic Sans MS" }}
        >
          Login
        </Link>
      </div>
    </header>
  );
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(Welcome);
