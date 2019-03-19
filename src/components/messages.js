import React, { Component } from "react";
import axios from "axios";

// Components
import ChannelNavLink from "../components/Navigation/ChannelNavLink";
import SendMessageForm from '../components/SendMessageForm';
import { connect } from "react-redux";


import * as actionCreators from "../store/actions";


class Messages extends Component {
    timer = 0
    state = {
        messages: []
    }
    componentDidMount() {
        if (this.props.user) {
            clearInterval(this.timer)
            this.props.getMessages(this.props.match.params.channelID);
        }
    }
    componentDidUpdate(prevState) {
        console.log("in component did update")
        if (prevState.match.params.channelID !== this.props.match.params.channelID) {
            console.log("difference")
            clearInterval(this.timer)
            this.timer = setInterval(() => this.props.getMessages(this.props.match.params.channelID), 3000)

        }
    }


    render() {
        if (this.props.channel.length !== 0) {
            let messeges = this.props.channel.map(message => <p>{message.username}: {message.message}</p>)
            return (
                <div className="channel">
                    <div>
                        <ul>{messeges}</ul>
                        <SendMessageForm channelID={this.props.match.params.channelID} />
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