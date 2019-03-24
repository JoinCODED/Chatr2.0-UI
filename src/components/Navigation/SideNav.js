import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import CreateChannelForm from "./CreateChannelForm";
import Modal from "react-modal";

class SideNav extends React.Component {
  state = {
    collapsed: false,
    open: false
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.getChannels();
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.user !== this.props.user) {
      if (this.props.user) {
        this.props.getChannels();
      }
    }
  }
  onOpenModal = () => this.setState({ open: true });

  onCloseModal = () => this.setState({ open: false });

  render() {
    const { open } = this.state;
    // const filteredChannels = this.props;
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));

    if (this.props.user) {



      return (
        <div>
          <ul
            className="navbar-nav navbar-sidenav"
            id="exampleAccordion"
            style={{ overflowY: "scroll" }}
          >
            <li
              className="nav-item"
              data-toggle="tooltip"
              data-placement="right"
            >
              <Link className="nav-link heading" to="/createChannel">
                <Modal open={open} onClose={this.onCloseModal} center>
                  <CreateChannelForm closeModal={this.onCloseModal} />
                </Modal>
                {/* <div className="card" onClick={this.onOpenModal}></div> */}
                <span className="nav-link-text mr-2">Channels</span>
                <FontAwesomeIcon icon={faPlusCircle} />
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
      return <div />;

    }
  }
}

const mapStateToProps = state => {
  return {
    channels: state.channels.channels,
    user: state.auth.user,
    filteredChannels: state.channels.filteredChannels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getChannels: () => dispatch(actionCreators.fetchChannels())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNav);
