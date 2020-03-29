import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SuperSecretPage = ({ user }) => {
  if (!user) return <Redirect to="/login" />;

  return (
    <div className="text-center ">
      <h1
        className="my-5 text-black"
        style={{ fontFamily: "Comic Sans MS", fontSize: 100 }}
      >
        Welcome {user.username}!
      </h1>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps)(SuperSecretPage);
