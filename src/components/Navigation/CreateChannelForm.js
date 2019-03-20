import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions";
import { Form } from "react-bootstrap";

class CreateChannelForm extends Component {
  state = {
    name: "",
    imageUrl: ""
  };

  textChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitChannel = event => {
    event.preventDefault();
    this.props.postChannel(this.state, this.props.closeModal);
  };

  componentWillUnmount() {
    if (this.props.errors.length) this.props.setErrors();
  }

  render() {
    const errors = this.props.errors;

    return (
      <div className="mt-5 p-2">
        <form onSubmit={this.submitChannel}>
          {!!errors.length && (
            <div className="alert alert-danger" role="alert">
              {errors.map(error => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
          {/* <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Channel Name</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.textChangeHandler}
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Image URL</span>
            </div>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.textChangeHandler}
            />
          </div> */}
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Channel Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Add your pretty channel"
                name="name"
                value={this.state.name}
                onChange={this.textChangeHandler}
              />
              {/* <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.textChangeHandler}
              /> */}
              <Form.Text className="text-muted">
                Name it anything in your mind.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="add a pic for your channel"
                name="imageUrl"
                value={this.state.imageUrl}
                onChange={this.textChangeHandler}
              />
              {/* <input
                type="text"
                className="form-control"
                name="imageUrl"
                value={this.state.imageUrl}
                onChange={this.textChangeHandler}
              /> */}
            </Form.Group>
          </Form>
          <input className="btn btn-success" type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postChannel: (newChannel, closeModal) =>
      dispatch(actionCreators.postChannel(newChannel, closeModal)),
    setErrors: () => dispatch(actionCreators.setErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateChannelForm);
