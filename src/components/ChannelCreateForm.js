import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "../store/actions";

class ChannelCreateForm extends Component {
  state = {
    name: "",
    owner: "",
    image_url: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.createChannels(this.state, this.props.history);
  };

  render() {
    const { name, image_url } = this.state;

    return (
      <div className="mt-5 p-2 ml-5">
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="name"
              name="name"
              value={name}
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="owner"
              name="owner"
              value={this.props.user.username}
              onChange={this.changeHandler}
              disabled
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="image_url"
              name="image_url"
              value={image_url}
              onChange={this.changeHandler}
            />
          </div>
          <input className="btn btn-primary" type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors.errors,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => ({
  createChannels: (userData, history) =>
    dispatch(actionCreators.createChannels(userData, history)) //pass state
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelCreateForm);
