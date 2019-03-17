import React, { Component } from "react";
import * as actionCreators from "../store/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class SuperSecretPage extends Component {
  componentDidMount() {
    this.props.onFetchChannels();
  }
  render() {
    return (
      <div>
        <h1>this page has all the secrets</h1>
        <p>now that you're logged in you can see this page</p>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchChannels: () => dispatch(actionCreators.fetchChannels())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(SuperSecretPage)
);
