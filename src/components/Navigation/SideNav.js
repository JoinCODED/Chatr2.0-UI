import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import plus from "../../assets/images/plus.png";

class SideNav extends React.Component {
  state = { collapsed: false };

  render() {
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));
    if (this.props.user) {
      return (
        <div style={{ textAlign: "left" }}>
          <ul
            className="navbar-nav navbar-sidenav bgside"
            id="exampleAccordion"
          >
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
            >
              <Link className="nav-link heading" to="/createChannel">
                <span className="nav-link-text mr-2 sidelink">Channels</span>
                <img
                  src={plus}
                  alt="channels"
                  style={{ width: "20%", height: "20%" }}
                />
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
                <FontAwesomeIcon
                  icon={this.state.collapsed ? faAngleRight : faAngleLeft}
                />
              </span>
            </li>
          </ul>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    channels: state.rootChannels.channels
  };
};
export default connect(mapStateToProps)(SideNav);
