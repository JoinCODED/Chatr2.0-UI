import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";

class Messages extends Component {

  componentDidMount() {
    this.props.getMessages(this.props.match.params.channelId)
  }

render() {
    return (
          <div>
          <h1 className="mb-1">WELCOME TO CHATR</h1>
          <h3 className="mb-5">
            <em>You're gonna need to login to see the messages</em>
          </h3>
          </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getMessages: (channelId) => dispatch(actionCreators.checkForExpiredToken(channelId)),
  };
};
const mapStateToProps = state => {
  return { messages: state.mess.messages };
};

export default connect(mapStateToProps,mapStateToProps)(Messages);