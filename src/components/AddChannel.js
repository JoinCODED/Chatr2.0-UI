import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { addChannel } from "../redux/actions/channels";
import { Redirect } from "react-router-dom";

class AddChannel extends Component {
  state = {
    name: "",
    image_url: ""
  };

  onTextChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  reset = () => {
    this.setState({ name: "", image_url: "" });
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.addChannel(this.state);
    this.reset();
  };
  render() {
    if (!this.props.user) return <Redirect to="/welcome" />;
    return (
      <div>
        <span
          className="nav-link heading"
          data-toggle="modal"
          data-target="#staticBackdrop"
          data-placement="right"
        >
          <span className="nav-link-text mr-2">Channels</span>
          <FontAwesomeIcon icon={faPlusCircle} />
        </span>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-backdrop="false"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ backgroundColor: "rgb(103, 107, 112)" }}
              >
                <h5 className="modal-title" id="staticBackdropLabel">
                  Channel <FontAwesomeIcon icon={faPlusCircle} />
                </h5>
              </div>
              <div className="modal-body">
                <form onSubmit={this.onSubmit}>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend"></div>
                    <input
                      type="text"
                      placeholder="Channel Name"
                      className="form-control"
                      name="name"
                      value={this.state.name}
                      onChange={this.onTextChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend"></div>
                    <input
                      type="url"
                      placeholder="Image URL"
                      className="form-control"
                      name="image_url"
                      value={this.state.image_url}
                      onChange={this.onTextChange}
                    />
                  </div>
                  <div className="modal-footer justify-content-center">
                    <button
                      type="button"
                      placeholder="Image URL"
                      className="btn btn-dark"
                      data-dismiss="modal"
                      onClick={this.reset}
                      style={{ backgroundColor: "rgb(103, 107, 112)" }}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      data-toggle="false"
                      className="btn btn-dark"
                      style={{ backgroundColor: "rgb(103, 107, 112)" }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addChannel: channel => dispatch(addChannel(channel))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddChannel);
