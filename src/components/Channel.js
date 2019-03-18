import React, { Component } from "react";
import { connect } from "react-redux";
import MessagesC from "./Messages"
import * as actionCreators from "../store/actions";

class Channel extends Component {
  state = {
    channel:{},
    message:null
  }
  componentDidMount(){
    this.getMessages()
    const messages = this.props.messages
    let lastMessages = {};
    if (messages.length !== 0){
      lastMessages = this.props.messages[this.props.messages.length-1]
      clearInterval(this.state.update)
      clearInterval(this.state.mount)
      let mount = setInterval(()=>this.getMessagesTimeStamp(this.props.match.params.channel,lastMessages.timestamp),5000)
      this.setState({mount:mount})
    }
    const channel = this.getChannel();
    this.setState({channel:channel})
  }
  componentDidUpdate(prevProps){
    if (prevProps.match.params.channel !== this.props.match.params.channel){
      const channel = this.getChannel();
      this.getMessages()
      this.setState({channel:channel})
    }
    const messages = this.props.messages
    let lastMessages = {};
    if (messages.length >  prevProps.messages.length ){
      lastMessages = this.props.messages[this.props.messages.length-1]
      clearInterval(this.state.update)
      let update = setInterval(()=>this.getMessagesTimeStamp(this.props.match.params.channel,lastMessages.timestamp),5000)
      this.setState({update:update})
    }
  }
  componentWillUnmount(){
    clearInterval(this.state.mount);
    clearInterval(this.state.update);
  }
  getMessages() {
    this.props.getMessages(this.props.match.params.channel)
  }
  getMessagesTimeStamp(channelId,timeStamp){
    //console.log("Hi");
    this.props.getMessagesTimeStamp(channelId,timeStamp)
  }
  getChannel = () => {
    let channel={};
    if(this.props.channels.length !== 0){
     channel = this.props.channels.find(channel => channel.id === +this.props.match.params.channel);
    }
    return channel ;
  }
  getMessage = () => {
    return this.props.messages.map(Messages => (
      <MessagesC key={Messages.id} Messages={Messages} />
    ));
  }
  handleKeyPress = event => {
    if (event.key === 'Enter'){
      const message = {message:this.state.message}
      this.props.sendMessage(this.props.match.params.channel,message)
      this.setState({message:""})
    }
  };
  setMessage = event => {
    this.setState({message:event.target.value}) 
  }
  render() {
    return (
      <header className="masthead d-flex mt-5">
        <div className="container z-1">
        <div className="card">
          <div className="card-header text-center">
            <h1>{this.state.channel.name}</h1>
          </div>
            <div style={{height: "400px"}}>
              <div className="h-100" style={{backgroundColor: "rgba(0,0,255,.1)", overflow: "scroll"}}>
                  {this.props.loading && this.getMessage()}
              </div>
            </div>
            <div className="input-group p-1">
              <input type="text" className="form-control" placeholder={`message ${this.state.channel.name}`} value={this.state.message} onKeyPress={this.handleKeyPress} onChange={this.setMessage}/>
            </div>
        </div>
      </div>
     </header>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMessages: (channelId) => dispatch(actionCreators.fetchMessages(channelId)),
    sendMessage: (channelId,message) => dispatch(actionCreators.sendMessage(channelId,message)),
    getMessagesTimeStamp:(channelId,timeStamp) => dispatch(actionCreators.getMessagesTimeStamp(channelId,timeStamp))
  };
};
const mapStateToProps = state => {
  return { 
    channels: state.channels.channels,
    messages: state.mess.masseges, 
    loading:state.mess.masseges, 
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Channel);
