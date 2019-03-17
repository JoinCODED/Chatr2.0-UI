import React, { Component } from "react";

import { connect } from "react-redux";

import * as actionCreators from "../store/actions/index";


class ChannelForm extends Component {
	state = {
		name: "",
		image_url: "",
	};

	textChangeHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	}

	submitChannel = event => {
		event.preventDefault();
		console.log("zerodebug => submitChannel: ", this.state)
		this.props.postChannel(this.state);
	};

	render() {
		// const errors = this.props.errors;

		return (
			<div className="mt-5 p-2">
				<form onSubmit={this.submitChannel}>
					
					{/* handling error (impl later)
						!!errors.length && (
						<div className="alert alert-danger" role="alert">
							{errors.map(error => (
								<p key={error}>{error}</p>
							))}
						</div>
					)*/}

					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text">
								Channel Name
							</span>
						</div>
						<input
							type="text"
							className="form-control"
							name="name"
							onChange={this.textChangeHandler}
						/>
					</div>

					<div className="input-group mb-3">
						<div className="input-group-prepend">
							<span className="input-group-text">
								Image URL
							</span>
						</div>
						<input
							type="text"
							className="form-control"
							name="image_url"
							onChange={this.textChangeHandler}
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
    postChannel: newCh => dispatch(actionCreators.postChannel(newCh))
  }
};

export default connect(
  null,
  mapDispatchToProps
)(ChannelForm);
