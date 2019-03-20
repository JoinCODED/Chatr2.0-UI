import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";

import loadingImg from '../assets/images/loadingcodeing.gif'

// Components
import SearchBar from "./SearchBar";
import Sound from 'react-sound';
import soundFile from '../assets/openended.mp3';


// Utility functions 
const ColoredLine = color => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
      borderRadius: "20px"
    }}
  />
);

const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';

  hours = (hours % 12) || 12; // the hour '0' should be '12'
  
  minutes = minutes < 10 ? ('0' + minutes) : minutes;
  
  return hours + ':' + minutes + ' ' + ampm;
}

const formatTimeS = (ts) => {
	let dateObj = new Date(ts);
	let date = dateObj.toDateString()
	let time = formatAMPM(dateObj)

	return time
}

class ChannelBoard extends Component {

	state = {
		message: "",
		played: false,
	} 

	 componentDidMount() {
		let currentChID = this.props.match.params.channelID;
		console.log("componentDidMount => ChannelBoard")


		let msgs = this.props.chObjMsgs
		let last = msgs[msgs.length - 1]

		this.props.getChannelMsgs(currentChID)
		

		this.checkForMsgsInterval = setInterval(
			() => {
				let msgs = this.props.chObjMsgs
				let lastMsg = msgs[msgs.length - 1]
				this.props.getChannelMsgs(currentChID, lastMsg.timestamp)
			},
			3000)


		this.props.getChannelInfo(currentChID)
	}

	componentDidUpdate(prevProps, prevState) {
		let currentChID = this.props.match.params.channelID;

		console.log("componentDidUpdate => ChannelBoard")


		// when tapping to different channels 
		if (prevProps.match.params.channelID !== currentChID) {
			
			this.props.setMsgLoading()

			clearInterval(this.checkForMsgsInterval)

			this.props.getChannelMsgs(currentChID)
		

			this.checkForMsgsInterval = setInterval(
				() => this.props.getChannelMsgs(currentChID, this.props.chObjMsgs[this.props.chObjMsgs.length-1].timestamp),
				3000)


			this.props.getChannelInfo(currentChID)
			this.props.restQuery()
		}

		// Sound related 
		if (prevProps.chObjMsgs && this.props.chObjMsgs) {
			if (prevProps.chObjMsgs.length !== this.props.chObjMsgs.length) {
				this.setState({played: true })
			}
		}
	}

	componentWillMount() {
		clearInterval(this.checkForMsgsInterval)
	}

	textChangeHandler = event => {
		this.setState({ message: event.target.value });
	}

	submitMsg = (event) => {
		let currentChID = this.props.match.params.channelID;
		event.preventDefault();
		console.log("zerodebug => submitMsg: ", this.state.message)
		console.log("zerodebug => this.currentChID: ", this.currentChID)
		let msgObj = {message: this.state.message}
		this.props.postMsg(msgObj, currentChID)
		this.setState({message: ""})
	}

	sound = () => {
		return (
			<Sound 
				url= {soundFile}
				playStatus= {Sound.status.PLAYING}
				autoLoad= {true}
				autoPlay = {true}
				onError = {(errorCode, description) => {
					console.log("sound error: ", description)}
				}
				onFinishedPlaying = {this.togglePlay} 
			/>
		);
	}

	togglePlay = () => this.setState({played: false})

	render() {

		let msgs = <div className = "content-board">
						<img 
						src={loadingImg} 
						alt="" 
						/>
					</div>

		let chObjMsgs = this.props.filterChObjMsgs;

		if (!this.props.loading) {
			let username = this.props.user.username
			
			console.log("zerodebug => username: ", username)

			
			msgs = chObjMsgs.map(msg => {
				return (
					<div
            class={
              username === msg.username
                ? "col-6 alert alert-success text-right float-right"
                : "col-6 alert alert-warning text-left"
            }
            style={{ clear: "both" }}
            role="alert"
          >
            <span className="chat-username">
              {msg.username.replace(/^\w/, c => c.toUpperCase())}
            </span>
            <p style={{ wordBreak: "break-all" }}>{msg.message}</p>
            <small className="chat-time">{formatTimeS(msg.timestamp)}</small>
          </div>
        );
      });
    }


		return (
	      <div className="row my-3" style={{ height: 665, overflow: "visible" }}>
	        <div className="col-12 ">
	          <SearchBar 
					key="ChannelBoard" 
					filter={this.props.filterMsgs}
				/>
				
	        </div>
	        <div className="col-12 ">
	          <div
	            className="container my-4 content-board"
	            style={{ height: 520, maxHeight: 520 }}
	          >
	            {msgs}
	          </div>
	        </div>
	        <div className="col-12">
	          <form onSubmit={this.submitMsg}>
	            
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
	                placeholder="Your message . ."
	                name="message"
	                value={this.state.message}
	                onChange={this.textChangeHandler}
	              />

	              <div className="input-group-append">
	                <button
	                  className="btn btn-outline-info"
	                  type="button"
	                  id="button-addon2"
	                  onClick={this.submitMsg}
	                >
	                  Send
	                </button>
	              </div>

	              {this.state.played && this.sound()}

	            </div>
	          </form>
	        </div>
	      </div>
	    );
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		chObjMsgs: state.channels.chObjMsgs,
		filterChObjMsgs: state.channels.filterChObjMsgs,
		chInfo: state.channels.chInfo,
		loading: state.channels.msgLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getChannelMsgs: (chID, time) => dispatch(actionCreators.getChannelMsgs(chID, time)),
		postMsg: (msg, chID) => dispatch(actionCreators.postMsg(msg, chID)),
		getChannelInfo: chID => dispatch(actionCreators.getChannelInfo(chID)),
		filterMsgs: (q) => dispatch(actionCreators.filterMsgs(q)),
		restQuery: () => dispatch(actionCreators.restQuery()),
		setMsgLoading: () => dispatch(actionCreators.setMsgLoading()),
	};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelBoard);
