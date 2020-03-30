import React, { Component } from "react";

// Components
// import { getChannel } from "../redux/actions";
import { connect } from "react-redux";

class ChannelDetail extends Component {
  render() {
    const title = this.props.match.params.channelTitle;
    const { channel } = this.props;
    const channelTitle = channel.filter(channel => channel.title === title);
    const messages = channelTitle[0].messages.map(msg => (
      <div className="card" key={msg}>
        <div className="card-body">{msg}</div>
      </div>
    ));
    //onSubmit={this.submitChannel}
    return (
      <div className="channel">
        <div>
          <h3>{channelTitle[0].title}</h3>
          {messages}
          <form>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                {/* <span className="input-group-text">Title</span> */}
              </div>
              <input
                type="text"
                className="form-control"
                name="title"
                // onChange={this.ChangeHandler}
                // value={this.state.title}
              />

              <button
                className="btn btn-info"
                type="button"
                // onClick={this.submitChannel}
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
    channel: state.channel.listChannel

    // loading: state.authorState.loading
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     getChannel: channelTitle => dispatch(getChannel(channelTitle))
//   };
// };
// export default ChannelDetail;
export default connect(mapStateToProps)(ChannelDetail);
