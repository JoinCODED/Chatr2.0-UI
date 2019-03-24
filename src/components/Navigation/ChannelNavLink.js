import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class ChannelNavLink extends Component {
  render() {
    const { channel } = this.props;
    return (
      <>
        {channel ? (
          <li
            className="nav-item"
            data-toggle="tooltip"
            data-placement="right"
            title={channel.name}
          >
            <NavLink className="nav-link" to={`/channel/${channel.id}`}>
              <img
                src={
                  channel.image_url
                    ? channel.image_url
                    : "https://img.heypik.com/png-vector/20190122/psd-mavericks-version-cartoon-character-animal-image-chat-emoticon-pack-sleeping-heypik-8QU455T.jpg?x-oss-process=image/quality,q_70/watermark,image_c2h1aXlpbl9uZXcucG5n,g_center"
                }
                alt={channel.name}
                width="42"
                height="42"
                border="5"
              />
              <span className=" ml-2 nav-link-text"> {channel.name}</span>
            </NavLink>
          </li>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default ChannelNavLink;
