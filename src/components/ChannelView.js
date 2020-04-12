import React, { Component } from "react";
import { connect } from "react-redux";
import { setMessage } from "../redux/actions";
import Messages from "./MessagesForm";
import Loading from "../assets/images/loading.gif";
import { CLEAR_MESSAGES } from "../redux/actions/actionTypes";
import ReactImageFallback from "react-image-fallback";
import Nav from "./Navigation/NavBar";

class ChannelView extends Component {
  theMessagesInterval() {
    this.interval = setInterval(() => {
      const messages = this.props.setMessages;
      let timestamp = "";

      if (messages.length) timestamp = messages[messages.length - 1].timestamp;

      const channelID = this.props.match.params.channelID;

      this.props.SetMessage(channelID, timestamp);
    }, 5000);
  }

  componentDidMount() {
    this.theMessagesInterval();
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    let channelID = this.props.match.params.channelID;

    if (channelID !== prevProps.match.params.channelID) {
      this.props.clearMessages();
      clearInterval(this.interval);
      this.theMessagesInterval();
    }
    this.scrollToBottom();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  };
  isUrlAndIsExtension(url) {
    const isvalid =
      url.includes("https://") ||
      url.includes("http://") ||
      url.includes("jpg") ||
      url.includes("png") ||
      url.includes("gif") ||
      url.includes("jpeg");
    return isvalid;
  }

  render() {
    if (this.props.setMessages && this.props.user !== null) {
      return (
        <div>
          {this.props.setMessages.map((msg) => {
            return (
              <div
                className="col-12"
                key={msg.id}
                style={
                  msg.username !== this.props.user.username
                    ? { marginLeft: "20px", textAlign: "left" }
                    : { marginLeft: "20px", textAlign: " right" }
                }
              >
                {msg.username !== this.props.user.username ? (
                  <div
                    className="card border-danger  mb-3 "
                    style={{
                      borderWidth: "medium",
                      background: "rgba(255, 255, 255, 0.71)",
                      marginRight: "50%",
                    }}
                  >
                    <div className="card-body ">
                      <p className="text-danger">{msg.username + ": "}</p>

                      {this.isUrlAndIsExtension(msg.message) ? (
                        <ReactImageFallback
                          src={msg.message}
                          fallbackImage="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/600px-No_image_available_600_x_450.svg.png"
                          style={{
                            width: "50%",
                            height: "50%",
                          }}
                        />
                      ) : (
                        <p className="textMessage">{msg.message}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    className="card border-success  mb-3 "
                    style={{
                      borderWidth: "medium",
                      background: "rgba(255, 255, 255, 0.71)",
                      marginLeft: "50%",
                      marginRight: "2.5%",
                    }}
                  >
                    <div className="card-body ">
                      <h5 className="text-dark text-right mr-3">
                        {msg.message}
                      </h5>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className=" navbar-brand ">
            <Messages channelID={this.props.match.params.channelID} />
          </div>
          <button
            id="last"
            className="navbar-toggler "
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
            fixed="bottom"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          >
            {""}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <img src={Loading} alt="" />
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    channel: state.rootChannels.channels,
    setMessages: state.rootChannel.setMessages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessages: () => dispatch({ type: CLEAR_MESSAGES }),
    SetMessage: (channelID, timestamp) =>
      dispatch(setMessage(channelID, timestamp)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChannelView);
