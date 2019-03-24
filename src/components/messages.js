import React, { Component } from "react";
import axios from "axios";

// Components
// import ChannelNavLink from "../components/Navigation/ChannelNavLink";
import SendMessageForm from "../components/SendMessageForm";
import { connect } from "react-redux";

import * as actionCreators from "../store/actions";

class Messages extends Component {
  timer = 0;
  state = {
    messages: []
  };
  async componentDidMount() {
    if (this.props.user) {
      clearInterval(this.timer);
      await this.props.getMessages(this.props.match.params.channelID);
      let elm = document.getElementById("scrollDown");
      elm.scrollIntoView({ behavior: "auto" });
    }
  }
  async componentDidUpdate(prevState) {
    if (
      prevState.match.params.channelID !== this.props.match.params.channelID
    ) {
      clearInterval(this.timer);
      //call reset here
      this.props.resetChannel(this.props.match.params.channelID);
      await this.props.getMessages(this.props.match.params.channelID);
      this.timer = setInterval(
        () => this.props.getMessages(this.props.match.params.channelID),
        3000
      );
      let elm = document.getElementById("scrollDown");
      elm.scrollIntoView({
        behavior: "auto",
        block: "end",
        inline: "nearest"
      });
    }
  }

  render() {
    if (this.props.channel.length !== 0) {
      let messeges = this.props.channel
        .filter(msg => msg.username)
        .map(message =>
          this.props.user.username === message.username ? (
            <div className="divuser col-12">
              <span className="  spanmessage1">{message.username}</span>
              <li className=" col-3 limessage1">{message.message}</li>
            </div>
          ) : (
            <div>
              <span className="spanmessage">{message.username}</span>
              <li className="limessage col-3">{message.message}</li>
            </div>
          )
        );
      return (
        <div className="channel">
          <div className="divulmessage">
            <ul className="ulmessage">{messeges}</ul>
            <SendMessageForm channelID={this.props.match.params.channelID} />
          </div>
          <div id="scrollDown" />
        </div>
      );
    } else {
      return <h1> loading or no messages </h1>;
    }
  }
}

const mapStateToProps = state => {
  return {
    channel: state.channel.messages,
    user: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMessages: channelID =>
      dispatch(actionCreators.fetchAllMessages(channelID)),
    resetChannel: channelID => dispatch(actionCreators.resetChannel())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
