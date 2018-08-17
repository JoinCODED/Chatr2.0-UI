import React, { Component } from "react";
import { observer } from "mobx-react";
import channelStore from "../../stores/channelStore";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = { messageInput: null, channelID: null };
  }

  componentDidMount() {
    this.setup();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.channel_name !==
      this.props.match.params.channel_name
    ) {
      this.setup();
    }
  }

  changeHandler = e => {
    this.setState({ messageInput: e.target.value });
  };

  createMessage = () => {
    const message = this.state.messageInput;
    channelStore.createMessage(message, this.state.channelID);
  };

  setup() {
    if (!channelStore.loading) {
      const url_channel_name = this.props.match.params.channel_name;
      const channel = channelStore.channels.find(
        channel => channel.name.toLowerCase() === url_channel_name.toLowerCase()
      );
      this.setState({ channelID: channel.id });
      channelStore.getMessage(channel.id);
    }
  }

  getMessages() {
    const messages = channelStore.messages;
    return messages.map(message => (
      <tr key={message.id}>
        <td>{message.message}</td>
      </tr>
    ));
  }
  render() {
    return (
      <React.Fragment>
        <table className="m-5">
          <tbody>{this.getMessages()}</tbody>
        </table>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <textarea
              onChange={this.changeHandler}
              className="form-control m-5"
            />
            <button
              onClick={this.createMessage}
              className="btn btn-primary m-5"
            >
              Send
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default observer(Messages);
