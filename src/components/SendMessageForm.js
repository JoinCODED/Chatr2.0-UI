import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../store/actions";



class SendMessageForm extends Component {


    state = {
        message: ''
    }


    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log({ message: this.state.message })
        this.props.PostMessage({ message: this.state.message }, this.props.channelID)
        this.setState({
            message: ''
        })
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="send-message-form">
                <input
                    onChange={this.handleChange}
                    placeholder="Type your message and hit ENTER"
                    value={this.state.message}
                    type="text" />
                <button type="submit" value="send" />
            </form>
        )
    }
}
// const mapStateToProps = state => {
//     return {
//         message: state.channel.message,
//         errors: state.errors
//     };
// };

const mapDispatchToProps = dispatch => {
    return {
        PostMessage: (NewMessage, Channel) =>
            dispatch(actionCreators.PostMessage(NewMessage, Channel)),
        setErrors: () => dispatch(actionCreators.setErrors())
    };
};



export default connect(
    null,
    mapDispatchToProps
)(SendMessageForm);