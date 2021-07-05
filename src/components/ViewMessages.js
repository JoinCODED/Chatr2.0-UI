import React, { Component } from "react";
import { connect } from "react-redux";
import { viewChannel } from "../redux/actions";
import AddMessage from "./AddMessage";
class ViewMessages extends Component {
  componentDidMount() {
    this.props.viewChannel(this.props.match.params.channelID);
  }

  componentDidUpdate(pastChannel) {
    const channelID = this.props.match.params.channelID;
    if (pastChannel.match.params.channelID !== channelID) {
      this.props.viewChannel(channelID);
    }
  }
  render() {
    if (this.props.currentChannel) {
      return (
        <div>
          {" "}
          {this.props.currentChannel.map(message => {
            return (
              <div style={{ marginLeft: "5%" }}>
                <h5>{message.username}:</h5>
                <p style={{ marginLeft: "10%" }}>{message.message}</p>
                <br />
              </div>
            );
          })}
          ;
          <AddMessage channelID={this.props.match.params.channelID} />
        </div>
      );
    } else {
      return (
        <div>
          <h1 style={{ marginLeft: "10%" }}> Loading, please wait.</h1>,
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    currentChannel: state.channelViewReducer.currentChannel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    viewChannel: channelID => dispatch(viewChannel(channelID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMessages);
