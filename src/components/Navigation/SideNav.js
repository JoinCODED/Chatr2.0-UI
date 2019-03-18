import React from "react";
import { Link } from "react-router-dom";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

// Components
import ChannelNavLink from "./ChannelNavLink";

class SideNav extends React.Component {
  state = { collapsed: false };

  render() {
    let user = this.props.user;
    let chs = this.props.channels;

    console.log("RNDER SIDE NAV");
    console.log("zerodebug => Channels: ", chs);
    const channelLinks = chs.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));
    console.log(user);
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
        <div className="col-12 my-4 channels-board" style={{ maxHeight: 500 }}>
          {user ? channelLinks : <div />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channels.channelsObj,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(SideNav);
