import React, { Component } from "react";
import { connect } from "react-redux";

class Messages extends Component {
	
render() {
	const messageObj = this.props.Messages;
	//2019-03-16T06:32:21.997461Z
	let timestampObj = messageObj.timestamp;
	const date = timestampObj.slice(0, 10);
	const time = timestampObj.slice(11, 16);

    return (
    	<div className={`${messageObj.username ===  this.props.user.username ? "card text-white p-2 float-right mb-1 mt-2 rounded-pill mr-2 bg-success":"card mb-1 mt-2 rounded-pill bg-light ml-2" }`} style={{width: "30rem", clear: "both", height: "auto"}}>
		  <div className="card-body">
		  	<h5 className="card-title">{messageObj.username} <small>{`${date} || ${time}`}</small></h5>
		    <div className="card-text" style={{fontSize:"15px"}}>{messageObj.message}</div>
		  </div>
		</div>
    );
  }
}
const mapStateToProps = state => {
  return { user: state.auth.user };
};
export default connect(mapStateToProps)(Messages);