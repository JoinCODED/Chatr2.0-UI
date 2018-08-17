import React from "react";
import { Link, withRouter } from "react-router-dom";
import { observer } from "mobx-react";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import channelStore from "../../stores/channelStore";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false, showInput: false, channelNameTxt: null };
  }

  changeHandler = e => {
    this.setState({ channelNameTxt: e.target.value });
  };

  createChannelHandler = () => {
    const input = this.state.channelNameTxt;
    channelStore.createChannel(input);
    this.refs.searchTxt.value = "";
  };

  showCreateInputField() {
    if (this.state.showInput) {
      return (
        <React.Fragment>
          <div className="row">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control create-text"
                onChange={this.changeHandler}
                ref="searchTxt"
              />
            </div>
            <div className="col-md-3 nav-link heading">
              <FontAwesomeIcon
                icon={faPlusCircle}
                onClick={this.createChannelHandler}
              />
            </div>
          </div>
        </React.Fragment>
      );
    }
  }

  show = () => {
    this.setState({ showInput: !this.state.showInput });
  };

  render() {
    const channelLinks = channelStore.channels.map(channel => {
      console.log("guegue");
      return <ChannelNavLink key={channel.name} channel={channel} />;
    });
    return (
      <div>
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
          <li
            onClick={this.show}
            className="nav-item"
            data-toggle="tooltip"
            data-placement="right"
          >
            <Link className="nav-link heading" to="/createChannel">
              <span className="nav-link-text mr-2">Channels</span>
              <FontAwesomeIcon icon={faPlusCircle} />
            </Link>
          </li>
          {this.showCreateInputField()} <br /> <br />
          {channelLinks}
        </ul>
        <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <a
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
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideNav;
