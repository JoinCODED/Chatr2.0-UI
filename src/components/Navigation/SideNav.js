import React from "react";
import { Link } from "react-router-dom";

import * as actionCreators from "../../store/actions";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

// Components
import ChannelNavLink from "./ChannelNavLink";
import SearchBar from "../SearchBar";

class SideNav extends React.Component {
  state = { collapsed: false };


  render() {
    let user = this.props.user;
    let chs = this.props.filteredChannels;

    const channelLinks = chs.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));

    if (user) {
      return (
        <div>
          <div className="row">
            <div className="col-1">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="col-11">{user ? `Hi ${user.username}` : ""}</div>
          </div>
          <div className="row my-2">
            <div className="col-1">
              <FontAwesomeIcon icon={faPlus} />
            </div>
            <div className="col-11">
              <Link to={user ? "/createChannel" : "/login"}>Add a channel</Link>
            </div>
          </div>
          <hr />
          <SearchBar key="channels" filter={this.props.filterChannels}/>
          
          <div
            className="col-12 my-4 channels-board"
            style={{ maxHeight: 440 }}
          >
            {user ? channelLinks : <div />}
          </div>
        </div>

      );} 
      else {
        return <div />
      }
  } 
}

const mapStateToProps = state => {
  return {
    channels: state.channels.channelsObj,
    filteredChannels: state.channels.filteredChannelsObj,
    user: state.auth.user
  };
};


const mapDispatchToProps = dispatch => {
  return {
    filterChannels: (q) => dispatch(actionCreators.filterChannels(q))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
