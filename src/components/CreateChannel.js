import React, { Component } from "react";
import { createChannel, setErrors } from "../redux/actions";
import { connect } from "react-redux";
class CreateChannel extends Component {
  state = {
    name: ""
  };
  ChangeHandler = e => this.setState({ [e.target.name]: e.target.value });
  submitChannel = event => {
    event.preventDefault();
    if (this.state.name) {
      this.props.createChannel(this.state);
      this.setState({ name: "" });
    }
  };
  //onSubmit={this.submitChannel}
  render() {
    return (
      <div className="container">
        <form onSubmit={this.submitChannel}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.ChangeHandler}
              value={this.state.name}
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
// const mapStateToProps = state => {
//   return {
//     errors: state.errors
//   };
// };
const mapDispatchToProps = dispatch => {
  return {
    createChannel: newChannel => dispatch(createChannel(newChannel)),
    setErrors: () => dispatch(setErrors())
  };
};

export default connect(null, mapDispatchToProps)(CreateChannel);
