import React, { Component } from "react";
import axios from "axios";

// Components
import ChannelNavLink from "../components/Navigation/ChannelNavLink";
import SendMessageForm from '../components/SendMessageForm';
import { connect } from "react-redux";


import * as actionCreators from "../store/actions";


class Messages extends Component {

    state = {
        messages: []
    }
    async componentDidMount() {
        if (this.props.user) {

            await this.props.getMessages(this.props.match.params.channelID);
            this.setState({
                messages: this.props.channel.map(message => (
                    <li key={message.id}>{message.username} : {message.message} <small>{message.timestamp}</small></li>
                ))
            })
        }
    }
    async componentDidUpdate(prevState) {
        if (prevState.match.params.channelID !== this.props.match.params.channelID) {
            this.props.getMessages(this.props.match.params.channelID)
            await this.props.getMessages(this.props.match.params.channelID);
            this.setState({
                messages: this.props.channel.map(message => (
                    <li key={message.id}>{message.username} : {message.message} <small>{message.timestamp}</small></li>
                ))
            })
        }
    }


    render() {
        if (this.state.messages.length !== 0) {
            return (
                <div className="channel">
                    <div>
                        <ul>{this.state.messages}</ul>
                        <SendMessageForm channelID={this.props.match.params.channelID} />
                        {/* <img
                            className="img-thumbnail img-fluid"
                            alt={channel}
                        /> */}
                    </div>
                    {/* <ChannelNavLink /> */}
                </div>
            );

        } else {
            return <h1> loading or no messages </h1>
        }

    }

}

const mapStateToProps = state => {
    return {
        channel: state.channel.messages,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getMessages: channelID => dispatch(actionCreators.fetchAllMessages(channelID))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages);
