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
    this.props.addChannel(this.state);
  };
  //onSubmit={this.submitChannel}
  render() {
    return (
      <div>
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
          </div>

          <input type="submit" />
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
