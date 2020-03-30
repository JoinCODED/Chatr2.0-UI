import React, { Component } from "react";
import { addChannel } from "../redux/actions";
import { connect } from "react-redux";
class CreateChannel extends Component {
  state = {
    title: ""
  };
  ChangeHandler = e => this.setState({ [e.target.name]: e.target.value });
  submitChannel = event => {
    event.preventDefault();
    if (this.state.title) {
      this.props.addChannel(this.state.title);
      this.setState({ title: "" });
    }
  };
  //onSubmit={this.submitChannel}
  render() {
    return (
      <div className="container">
        <form onSubmit={this.submitChannel}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Title</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="title"
              onChange={this.ChangeHandler}
              value={this.state.title}
            />

            <button
              className="btn btn-info"
              type="button"
              onClick={this.submitChannel}
            >
              + New Channel
            </button>
          </div>
          {/* <input type="submit" onSubmit={this.submitChannel} /> */}
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addChannel: newChannel => dispatch(addChannel(newChannel))
  };
};

export default connect(null, mapDispatchToProps)(CreateChannel);
