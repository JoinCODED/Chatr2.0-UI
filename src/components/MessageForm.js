import React, { Component } from "react";
import { connect } from "react-redux";
import { postMessage } from "../redux/actions";

class MessageForm extends Component {
  state = {
    message: ""
  };

  submitMessage = e => {
    console.log("text");
    e.preventDefault();
    this.props.postMessage(this.state, this.props.channelID);
    this.setState({ message: "" });
  };

  render() {
    return (
      <div className="container-fluid">
        <form className="col-11 mx-auto" onSubmit={this.submitMessage}>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Type your message here"
            value={this.state.message}
            onChange={e => this.setState({ message: e.target.value })}
            onKeyUp={e => {
              if (!e.shiftKey && e.key === "Enter") this.submitMessage(e); //If the user press Shitf+Enter the form will not submit , if he uses "Enter" the form will submit
            }}
          />
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    postMessage: (message, channelID) =>
      dispatch(postMessage(message, channelID))
  };
};

export default connect(null, mapDispatchToProps)(MessageForm);
