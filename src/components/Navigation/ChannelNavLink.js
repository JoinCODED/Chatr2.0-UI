import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/index";


class ChannelNavLink extends Component {
  render() {
    const { channel } = this.props;
    return (
      <li
        className="nav-item"
        data-toggle="tooltip"
        data-placement="right"
        title={channel.name}
      >
        <NavLink 
        className="nav-link"
        to={`/channels/${channel.id}`}
        >
          <FontAwesomeIcon icon={faHashtag} />
          <span className="nav-link-text"> {channel.name}</span>
        </NavLink>
      </li>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getChannel: (ch) => dispatch(actionCreators.getChannel(ch))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ChannelNavLink);
