import React, { Component } from "react";
import { fetchChannelDetail, sendMessage } from "../redux/actions";
// Components

import { connect } from "react-redux";

class ChannelDetail extends Component {
  componentDidMount() {
    this.props.getChannel(this.props.match.params.channelID);
  }
  componentDidUpdate(preProps) {
    if (this.props.match.params.channelID !== preProps.match.params.channelID)
      this.props.getChannel(this.props.match.params.channelID);
  }

  state = {
    username: "",
    message: ""
    // channel: [this.props.channel.id]
  };
  ChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  submitMessage = event => {
    event.preventDefault();
    if (this.state.message) {
      this.props.sendMessage(this.props.match.params.channelID, this.state);
      this.setState({ message: "" });
    }
  };
  render() {
    // const title = this.props.match.params.channelTitle;
    const { channel } = this.props;
    let messages = "";
    if (channel) console.log(channel);
    if (channel) {
      // The key should be on the card div, not the card-body div.
      messages = channel.map(msg => (
        <div className="card">
          <div className="card-body " key={msg.id}>
            {msg.username} : {msg.message}
          </div>
        </div>
      ));
    }

    return (
      <div className="channel">
        <div className="scrollbar square scrollbar-lady-lips thin">
          <div className="force-overflow">{messages}</div>
        </div>
        <form onSubmit={this.submitMessage}>
          <div className="input-group mb-3">
            <div className="input-group-prepend"></div>
            <input
              type="text"
              className="form-control"
              name="message"
              onChange={this.ChangeHandler}
              value={this.state.message}
            />

            <button
              className="btn btn-info"
              type="button"
              onClick={this.submitMessage}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channel: state.channelState.channel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChannel: channelID => dispatch(fetchChannelDetail(channelID)),
    sendMessage: (channelID, newMessage) =>
      dispatch(sendMessage(channelID, newMessage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetail);
