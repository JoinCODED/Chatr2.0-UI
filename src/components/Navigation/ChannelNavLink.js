import React from "react";
import { NavLink } from "react-router-dom";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

const ChannelNavLink = ({ channel }) => (
  <li
    className="nav-item"
    data-toggle="tooltip"
    data-placement="right"
    title={channel.name}
  >
    <NavLink className="nav-link" to={`/channels/${channel.name}`} onclick="scrollWin(0, 50)">
      <FontAwesomeIcon icon={faHashtag} />
      <span className="nav-link-text"  > {channel.name}</span>
    </NavLink>
  </li>
);

export default ChannelNavLink;
