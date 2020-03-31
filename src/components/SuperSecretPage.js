import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SuperSecretPage = ({ user }) => {
  // if (user) return <Redirect to="/private" />;

  return (
    <div>
      {/* <h1>this page has all the secrets</h1>
      <p>now that you're logged in you can see this page</p> */}
      <h1>Choose Channel</h1>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(SuperSecretPage);
