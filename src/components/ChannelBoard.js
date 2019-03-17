import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "../store/actions"


const ColoredLine = (color) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);


class ChannelBoard extends Component {
	componentDidMount(){
		// console.log(this.props.match.params.channelID)
		this.props.getChannel(this.props.match.params.channelID)
	}
	componentDidUpdate(prevState){
		if(prevState.match.params.channelID !== this.props.match.params.channelID ){
			this.props.getChannel(this.props.match.params.channelID)
		}
	}
	render() {
		if(this.props.chObj.length!== 0){
		let chObj = this.props.chObj
		console.log("chObj: ", chObj)
		let msgs = chObj.map((msg) => {
			return (
				
				<div className="mx-4" key={msg.id}>
				
					<h4>
						{
							msg.username.replace(/^\w/, c => c.toUpperCase())
						}
					</h4>
					<p>
						{msg.message}<br />
						<small>
							{msg.timestamp}
						</small>
					</p>
					{ColoredLine("black")}
				</div>
				
			)
		}) 
		return (
			<div>
			{msgs}
			</div>
		);
	}else{
		return <p> no messages yet</p>
		}
	}
		
}

const mapStateToProps = state => {
  return {
    chObj: state.channels.chObj
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChannel: (ch) => dispatch(actionCreators.getChannel(ch))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChannelBoard);
