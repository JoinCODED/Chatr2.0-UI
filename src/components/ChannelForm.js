import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { addChannel } from "../redux/actions";
import { connect } from "react-redux";
import create from "../assets/images/create.png";

class ChannelForm extends Component {
  state = {
    name: "",
    image_url: ""
  };

  textChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  resetForm = () =>
    this.setState({
      name: "",
      image_url: ""
    });

  submitChannel = event => {
    event.preventDefault();
    this.props.addChannel(this.state, this.resetForm, this.props.history);
  };

  render() {
    if (this.props.user === null) return <Redirect to="/" />;

    const errors = this.props.errors;

    return (
      <div
        className="card col-6 mx-auto p-0 mt-5"
        style={{
          background: "rgba(255, 255, 255, 0.71)"
        }}
      >
        <div className="card-body">
          <h2 className="card-title mt-5 text-center text-black">
            {" "}
            Create a new Channel{" "}
          </h2>
          <div className="mt-5 p-5">
            <form onSubmit={this.submitChannel}>
              {!!errors.length && (
                <div className="alert alert-danger" role="alert">
                  {errors.map(error => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              )}
              <div className="input-group mb-3 border  border-5 ">
                <div className="input-group-prepend ">
                  <span className="input-group-text bg-dark text-white">
                    {" "}
                    Channel Name
                  </span>
                </div>
                <input
                  id="btnin"
                  type="text"
                  placeholder="Type channel name here.."
                  className="form-control border-0 text-black"
                  name="name"
                  value={this.state.name}
                  onChange={this.textChangeHandler}
                />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-dark text-white">
                    Image URL
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control border text-black"
                  name="image_url"
                  onChange={this.onTextchange}
                />
              </div>
              <div className="text-center">
                <button
                  id="btnlog"
                  type="submit"
                  className=" btn "
                  style={{ width: "30%", height: "30%" }}
                >
                  <img
                    src={create}
                    alt="create a new channel"
                    style={{ width: "100%", height: "100%" }}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addChannel: (newChannelName, resetForm, history) =>
      dispatch(addChannel(newChannelName, resetForm, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelForm);
