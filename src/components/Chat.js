import React, { Component } from "react";
import { fetchMessages, postMessage } from "../redux/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "emoji-mart/css/emoji-mart.css";
import ChatBar from "./ChatBar";
import Loading from "./Loading";

class Chat extends Component {
  state = {
    messages: { message: "" },
    channelID: this.props.match.params.channelID,
    refresh: true,
    showEmojis: false,
    length: null
  };

  componentDidMount() {
    let timestamp = "";
    this.props.fetchMessages(this.state.channelID, timestamp);
    this.interval = setInterval(() => {
      const messages = this.props.messages;
      if (messages.length) {
        timestamp = messages[messages.length - 1].timestamp;
      }
      this.props.fetchMessages(this.state.channelID, timestamp);
    }, 2000);
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (prevProps.match.params.channelID !== channelID) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        const messages = this.props.messages;
        let timestamp = "";
        if (messages.length) {
          timestamp = messages[messages.length - 1].timestamp;
        }
        this.props.fetchMessages(channelID, timestamp);
      }, 2000);
    }

    let len = this.props.messages.length;

    if (this.state.length != len) {
      this.setState({ length: len });
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "auto" });
  };

  clearForm = () => {
    this.setState({ messages: { message: "" } });
  };

  validURL = string => {
    try {
      new URL(string);
    } catch (_) {
      return false;
    }
    return true;
  };
  checkImageURL(url) {
    return url.match(/.(jpeg|jpg|gif|png)$/) != null;
  }

  dateToWeekday = (year, month, day) => {
    let y = parseInt(year),
      m = parseInt(month),
      d = parseInt(day);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    d = new Date(y, --m, d);
    return d && days[d.getDay()];
  };
  onSubmit = message => {
    this.props.postMessage(this.props.match.params.channelID, message);
  };
  render() {
    if (!this.props.user) {
      return <Redirect to="/welcome" />;
    }
    const messagesCards = this.props.messages.map(message => {
      const date = message.timestamp;
      let year = date.substring(0, 4);
      let month = date.substring(5, 7);
      let day = date.substring(8, 10);

      let weekDay = this.dateToWeekday(year, month, day);
      if (this.validURL(message.message)) {
        if (this.checkImageURL(message.message)) {
          return (
            <div>
              <div>
                <p className="message">
                  {" "}
                  <div
                    style={{
                      fontSize: 16,
                      color: "#7289DA",
                      padding:
                        this.props.user.username !== message.username
                          ? "0px"
                          : "8px 15px"
                    }}
                  >
                    {this.props.user.username !== message.username
                      ? `${message.username}:`
                      : ""}
                  </div>
                </p>
              </div>
              <br />
              <div
                className="img-align"
                style={{
                  textAlign:
                    this.props.user.username === message.username
                      ? "right"
                      : "left"
                }}
              >
                <img
                  style={{ maxWidth: "60vh" }}
                  src={`${message.message}`}
                  alt="image"
                />
                <br></br>{" "}
                <div
                  style={{
                    fontSize: "10px",
                    display: "inline",
                    opacity: "0.5",
                    align: "right"
                  }}
                >
                  {`${weekDay} ${date.substring(11, 16)}`}
                </div>
              </div>

              <br />
              <br />
            </div>
          );
        }
      }

      return this.props.user.username !== message.username ? (
        <div className="yours messages">
          <div className={this.props.darkmode ? "message" : "message-light"}>
            <div
              style={
                this.props.darkmode
                  ? { fontSize: 16, color: "#7289DA", paddingRight: "0px" }
                  : { fontSize: 16, color: "#4a57a8", paddingRight: "0px" }
              }
            >
              {message.username}{" "}
            </div>
            <div style={{ fontSize: 13 }}> {message.message}</div>
            <div
              style={{
                fontSize: "10px",
                display: "inline",
                opacity: "0.5",
                align: "right"
              }}
            >
              {`${weekDay} ${date.substring(11, 16)}`}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            this.props.darkmode ? "mine messages" : "mine messages light"
          }
        >
          <div align="right">
            <div
              className={this.props.darkmode ? "message" : "message-light"}
              style={{
                padding: "8px 15px",
                marginTop: "0px",
                marginBottom: "0px"
              }}
            >
              <div style={{ fontSize: 13 }}> {message.message}</div>{" "}
              <div
                style={{
                  fontSize: "10px",
                  display: "inline",
                  opacity: "0.5"
                }}
              >
                {`${weekDay} ${date.substring(11, 16)}`}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        {this.props.loading ? (
          <div>
            <Loading />
            <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            ></div>
          </div>
        ) : (
          <div className="container chatholder">
            <div className="container chatbox">
              {this.props.channelID}
              {messagesCards}
              <div
                style={{ float: "left", clear: "both" }}
                ref={el => {
                  this.messagesEnd = el;
                }}
              ></div>
            </div>
            <div className="chat-box-margin"></div>
            <ChatBar
              channelID={this.state.channelID}
              onSubmit={this.onSubmit}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    messages: state.messages,
    loading: state.manager.loading,
    darkmode: state.manager.darkmode
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: (channelID, timestamp) =>
      dispatch(fetchMessages(channelID, timestamp)),
    postMessage: (channelID, message) =>
      dispatch(postMessage(channelID, message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);