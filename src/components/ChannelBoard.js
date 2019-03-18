import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";

const ColoredLine = color => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
      borderRadius: "20px"
    }}
  />
);

class ChannelBoard extends Component {
  state = {
    message: ""
  };

  async componentDidMount() {
    let currentChID = this.props.match.params.channelID;

    this.checkForMsgsInterval = setInterval(
      () => this.props.getChannelMsgs(currentChID),
      3000
    );

    await this.props.getChannelInfo(currentChID);

    console.log(this.props.chInfo);
  }

  componentDidUpdate(prevState) {
    let currentChID = this.props.match.params.channelID;
    if (prevState.match.params.channelID !== currentChID) {
      clearInterval(this.checkForMsgsInterval);
      this.checkForMsgsInterval = setInterval(
        () => this.props.getChannelMsgs(currentChID),
        3000
      );
    }
  }

  componentWillMount() {
    clearInterval(this.checkForMsgsInterval);
  }

  textChangeHandler = event => {
    this.setState({ message: event.target.value });
  };

  submitMsg = event => {
    event.preventDefault();
    console.log("zerodebug => submitMsg: ", this.state.message);
    console.log("zerodebug => this.currentChID: ", this.currentChID);
    this.props.postMsg(this.state, this.currentChID);
    this.setState({ message: "" });
  };
  render() {
    let msgs = <p> No messages yet . . </p>;

    if (this.props.chObjMsgs.length !== 0) {
      let username = this.props.user.username;

      console.log("zerodebug => username: ", username);

      let chObjMsgs = this.props.chObjMsgs;
      msgs = chObjMsgs.map(msg => {
        return (
          <div
            className={username === msg.username ? "mx-4 text-right" : "mx-4"}
            key={msg.id}
          >
            <h4>{msg.username.replace(/^\w/, c => c.toUpperCase())}</h4>
            <p style={{ wordBreak: "break-all" }}>
              {msg.message}
              <br />
              <small className="border-bottom">{msg.timestamp}</small>
            </p>
            {ColoredLine(username === msg.username ? "#5C33AE" : "#AE4432")}
          </div>
        );
      });
    }

    return (
      <div className="row my-3" style={{ height: 665, overflow: "visible" }}>
        <div className="col-12">
          <div className="col-12 ">
            <input
              className="form-control form-field-format"
              name="searchBarMsg"
              placeholder="Search for message . ."
            />
          </div>
        </div>
        <div className="col-12 ">
          <div
            className="container my-4 content-board"
            style={{ height: 520, maxHeight: 520 }}
          >
            {msgs}
          </div>
        </div>
        <div className="col-12">
          <form onSubmit={this.submitMsg}>
            {/* handling error (impl later)
			!!errors.length && (
			<div className="alert alert-danger" role="alert">
				{errors.map(error => (
					<p key={error}>{error}</p>
				))}
			</div>
			)*/}
            <div className="input-group mb-3 my-4">
              <input
                type="text"
                className="form-control"
                placeholder="Your message . ."
                name="message"
                value={this.state.message}
                onChange={this.textChangeHandler}
              />

              <div className="input-group-append">
                <button
                  className="btn btn-outline-info"
                  type="button"
                  id="button-addon2"
                  onClick={this.submitMsg}
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    chObjMsgs: state.channels.chObjMsgs,
    chInfo: state.channels.chInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChannelMsgs: chID => dispatch(actionCreators.getChannelMsgs(chID)),
    postMsg: (msg, chID) => dispatch(actionCreators.postMsg(msg, chID)),
    getChannelInfo: chID => dispatch(actionCreators.getChannelInfo(chID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelBoard);
