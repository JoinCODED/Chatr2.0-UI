import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class ChannelForm extends Component {
  state = {
    name: "",
    image_url: "",
    owner: ""
  };
  submitChannel = event => {
    event.preventDefault();
    this.props.createChannel(this.state);
  };

  onTextchange = event =>
    this.setState({ [event.target.name]: event.target.value });
  render() {
    return (
      <form onSubmit={this.submitChannel}>
        <header className="masthead d-flex mt-5">
          <div className="container text-left my-auto z-1">
            <div className="form-group">
              <label for="formGroupExampleInput">Channel Name</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                name="name"
                onChange={this.onTextchange}
              />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput2">Channel Owner</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                name="owner"
                onChange={this.onTextchange}
              />
            </div>

            <div className="form-group">
              <label for="formGroupExampleInput2">Channel Avatar</label>
              <input
                type="text"
                className="form-control"
                id="formGroupExampleInput"
                name="image_url"
                onChange={this.onTextchange}
              />
            </div>
          </div>
        </header>
        <div className="container text-left my-auto z-1">
          <input type="submit" className="btn btn-dark" />
        </div>
      </form>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    createChannel: newChannel =>
      dispatch(actionCreators.createChannel(newChannel))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ChannelForm);