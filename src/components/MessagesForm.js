import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setMessage, sendMessages } from "../redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import waterMelonE from "../assets/images/watermelonE.png";

class SendingMessages extends Component {
  state = {
    message: "",
    showEmojis: false,
  };

  showEmojis = (e) => {
    this.setState(
      {
        showEmojis: true,
      },
      () => document.addEventListener("click", this.closeMenu)
    );
  };

  addEmoji = (e) => {
    let emoji = "";
    emoji += e.native;
    this.setState({
      message: this.state.message + emoji,
    });
  };

  closeMenu = (e) => {
    console.log(this.emojiPicker);
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState(
        {
          showEmojis: false,
        },
        () => document.removeEventListener("click", this.closeMenu)
      );
    }
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  resetForm = () =>
    this.setState({
      message: "",
    });

  submitHandler = (event) => {
    event.preventDefault();
    this.props.SendMessages(
      this.props.channelID,
      this.state,
      this.props.user,
      this.resetForm
    );
  };
  render() {
    if (!this.props.user) return <Redirect to="/login" />;

    return (
      <div
        className="container-fluid "
        style={{
          textAlign: "center",
          position: "relative",
          selfAlign: "center",
        }}
      >
        <button style={{ marginLeft: "55%" }}>
          {this.state.showEmojis ? (
            <span ref={(el) => (this.emojiPicker = el)}>
              <Picker
                onSelect={this.addEmoji}
                emojiTooltip={true}
                title="Osama & Hammam"
              />
            </span>
          ) : (
            <p
              onClick={this.showEmojis}
              style={{ marginBottom: "5px", marginTop: "3px" }}
              className=""
            >
              {String.fromCodePoint(0x1f60a)}
            </p>
          )}
        </button>
        <form name="messageForm" onSubmit={this.submitHandler}>
          <div id="scroller">
            <div className="row">
              <label
                forhtml="colFormLabel"
                style={{
                  marginLeft: "1rem ",
                  textShadow:
                    "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
                }}
              ></label>
              <input
                type="text"
                className="form-control form-control-lg input col"
                id="colFormLabel"
                style={{
                  borderColor: "#e30090",
                  borderWidth: "2px",
                  hight: "100px",
                  width: "90rem",
                  marginLeft: "5%",
                  selfAlign: "center",
                }}
                name="message"
                value={this.state.message}
                placeholder="Write your message..."
                onChange={this.changeHandler}
              ></input>

              <div>
                <button
                  id="send"
                  type="submit"
                  value="Send"
                  style={{ marginTop: "5px" }}
                  className=""
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
              <div />
              <div></div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    channels: state.rootChannels.channels,
    channel: state.rootChannel.setMessages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetMessage: (channelID, timestamp) =>
      dispatch(setMessage(channelID, timestamp)),
    SendMessages: (channelID, message, user, resetForm) =>
      dispatch(sendMessages(channelID, message, user, resetForm)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SendingMessages);
