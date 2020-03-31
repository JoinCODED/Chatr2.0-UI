import React, { Component } from "react";
import { fetchChannelDetail } from "../redux/actions";
// Components

import { connect } from "react-redux";

class ChannelDetail extends Component {
  componentDidMount() {
    this.props.getChannel(this.props.match.params.channelID);
  }

  // state = {
  //   message: ""
  // };
  // ChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  // submitMessage = event => {
  //   event.preventDefault();
  //   if (this.state.message) {
  //     this.props.addMessage(this.state.message);
  //     this.setState({ message: "" });
  //   }
  // };
  render() {
    // const title = this.props.match.params.channelTitle;
    const { channel } = this.props;
    console.log(channel);
    // const channelTitle = channels.filter(channel => channel.title === title);
    // const messages = channel.map(msg => (
    //   <div className="card" key={msg.id}>
    //     <div className="card-body">{msg.id}</div>
    //   </div>
    // ));
    //onSubmit={this.submitMessage}
    return (
      <div className="channel">
        <div>
          {/* <h3>{channelTitle[0].title}</h3> */}
          {/* {messages} */}
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                {/* <span className="input-group-text">Title</span> */}
              </div>
              <input
                type="text"
                className="form-control"
                name="message"
                // onChange={this.ChangeHandler}
                // value={this.state.message}
              />

              <button
                className="btn btn-info"
                type="button"
                // onClick={this.submitMessage}
              >
                Send
              </button>
            </div>
            {/* <input type="submit" onSubmit={this.submitChannel} /> */}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channel: state.channelState.messages
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     addMessage: newMesssage => dispatch(addMessage(newMesssage))
//   };
// };
const mapDispatchToProps = dispatch => {
  return {
    getChannel: channelID => dispatch(fetchChannelDetail(channelID))
  };
};
// export default ChannelDetail;
export default connect(mapStateToProps, mapDispatchToProps)(ChannelDetail);
