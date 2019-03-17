import React from "react";
import { Link } from "react-router-dom";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";


// Components
import ChannelNavLink from "./ChannelNavLink";

class SideNav extends React.Component {
  state = { collapsed: false };
  gitChannels = () => {
    if (this.props.user){
    return this.props.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));
    }
  }
  render() {
    const channelLinks = this.gitChannels()
    return (
      <div>
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
          <li className="nav-item" data-toggle="tooltip" data-placement="right">
            <Link className="nav-link heading" to="/CreateChannelForm">
              <span className="nav-link-text mr-2">Channels</span>
              <span style={{fontSize: '23px'}}><FontAwesomeIcon icon={faPlusCircle} /></span>
            </Link>
          </li>
          {channelLinks}
        </ul>
        <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <span
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <span style={{fontSize:"23px"}}><FontAwesomeIcon
                icon={this.state.collapsed ? faAngleDoubleRight : faAngleDoubleLeft}
              /></span>
            </span>
          </li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { 
    channels: state.channels.channels,
    user: state.auth.user
  };
};
export default connect(mapStateToProps)(SideNav);

