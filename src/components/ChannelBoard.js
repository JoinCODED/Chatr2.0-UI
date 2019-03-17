import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";

const ColoredLine = color => (
	<hr
		style={{
			color: color,
			backgroundColor: color,
			height: 5,
			borderRadius: "20px",
		}}
	/>
);

class ChannelBoard extends Component {
	state = {
		message: ""
	} 


	currentChID = this.props.match.params.channelID;

	componentDidMount() {
		// let chID = this.props.match.params.channelID;
		this.props.getChannel(this.currentChID);
	}
	
	componentDidUpdate(prevState) {
		// let this.currentChID = this.props.match.params.channelID;
		if (prevState.match.params.channelID !== this.currentChID) {
			this.props.getChannel(this.currentChID);
		}
	}

	componentWillMount() {
		console.log("ChannelBoard => componentWillMount")
	}

	textChangeHandler = event => {
		this.setState({ message: event.target.value });
	}

	submitMsg = (event) => {
		event.preventDefault();
		console.log("zerodebug => submitMsg: ", this.state.message)
		console.log("zerodebug => this.currentChID: ", this.currentChID)
		this.props.postMsg(this.state, this.currentChID)
		this.setState({message: ""})
	} 
	render() {

		let msgs = <p> No messages yet... </p>;

		if (this.props.chObj.length !== 0) {
			let chObj = this.props.chObj;
			msgs = chObj.map(msg => {
				return (
					<div className="mx-4" key={msg.id}>
						<h4>
							{msg.username.replace(/^\w/, c => c.toUpperCase())}
						</h4>
						<p>
							{msg.message}
							<br />
							<small className="border-bottom">
								{msg.timestamp}
							</small>
						</p>
						{ColoredLine("#AE4432")}
					</div>
				);
			});

		}

		return (

			<div className="container">
				{msgs}

				<form
				className="my-5" 
				onSubmit={this.submitMsg}>
					
					{/* handling error (impl later)
						!!errors.length && (
						<div className="alert alert-danger" role="alert">
							{errors.map(error => (
								<p key={error}>{error}</p>
							))}
						</div>
					)*/}

					<div className="input-group mb-3 my-4">
					  <input
					  	type="text" 
					  	className="form-control" 
					  	placeholder="Your message..." 
					  	name="message"
					  	value={this.state.message}
						onChange={this.textChangeHandler}
						/>

					  <div className="input-group-append">
					    <button 
					    className="btn btn-outline-secondary" 
					    type="button" 
					    id="button-addon2"
					    onClick={this.submitMsg}>
					    	Send
					    </button>
					  </div>
					
					</div>
					{
						//<input type="submit" />
					}
				</form>
			</div>
		)

	}
}

const mapStateToProps = state => {
	return {
		chObj: state.channels.chObj
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getChannel: chID => dispatch(actionCreators.getChannel(chID)),
		postMsg: (msg, chID) => dispatch(actionCreators.postMsg(msg, chID)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChannelBoard);
