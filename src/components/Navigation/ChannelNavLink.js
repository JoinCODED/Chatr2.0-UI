import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

class ChannelNavLink extends Component {
  render() {
    const  channel  = this.props.channel;
    return (
      <li
        className="nav-item"
        data-toggle="tooltip"
        data-placement="right"
        title={channel.name}
      >
        <NavLink className="nav-link" to={`/channel/${channel.id}`}>
          <span style={{fontSize: '23px'}}><FontAwesomeIcon icon={faHashtag} /></span>
          <span className="nav-link-text"> {channel.name}</span>
        </NavLink>
      </li>
    );
  }
}

export default ChannelNavLink;
