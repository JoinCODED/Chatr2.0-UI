import React, { Component } from 'react';
import { connect } from "react-redux";


class ChannelBoard extends Component {
	render() {
		
		return (
			<div></div>
		);
	}
}




const mapStateToProps = state => {
  return {
    chObj: state.channels.chObj
  };
};

export default connect(mapStateToProps)(ChannelBoard);
