import React, { Component } from "react";
import Messages from "./Messages"
import { Link } from "react-router-dom";
import { connect } from "react-redux";



class Channel extends Component {
  state = {
    channel:null
  }
  componentDidUpdate() {
   this.gitChannel();
  }
  gitChannel = () => {
    const channel = this.props.channels.map(channel => channel.id === +this.props.match.params.channel);
    if (!this.state.channel){
      this.setState({channel:channel})
    }
    else if (channel.id !== this.state.channel.id){
      this.setState({channel:channel})
    }
  }
  gitMessages = () => {
    return <Link to={`/channel/${this.props.match.params.channel}/messages`}/>
  }
  render() {
    
    return (
      <header className="masthead d-flex mt-5">
        <div className="container z-1">
        <div className="card">
          <div className="card-header text-center">
            <h1>{}</h1>
          </div>
            <div className="" style={{height: "400px"}}>
              <div className="h-100" style={{backgroundColor: "rgba(0,0,255,.1)"}}>
              {}
              </div>
            </div>
        </div>
      </div>
     </header>
    );
  }
}
const mapStateToProps = state => {
  return { channels: state.channels.channels };
};
export default connect(mapStateToProps)(Channel);
