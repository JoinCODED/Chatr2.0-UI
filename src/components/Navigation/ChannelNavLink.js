import React from "react";
import { NavLink } from "react-router-dom";
import defaul_image from "../../assets/images/default.gif";

// FontAwesome
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHashtag } from "@fortawesome/free-solid-svg-icons";

const ChannelNavLink = ({ channel }) => (
  <li
    className="nav-item"
    data-toggle="tooltip"
    data-placement="right"
    title={`Owner: ${channel.owner}`}
  >
    <NavLink className="nav-link" to={`/ChannelView/${channel.id}`}>
      {channel.image_url ? (
        <img
          src={channel.image_url}
          alt="CHANNEL_IMAGE"
          width="17%"
          height="17%"
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <img
          src={defaul_image}
          alt="NO_IMAGE"
          width="17%"
          height="17%"
          style={{ borderRadius: "50%" }}
        />
      )}
      <span className="nav-link-text"> {channel.name}</span>
      <br />
    </NavLink>
  </li>
);

export default ChannelNavLink;
