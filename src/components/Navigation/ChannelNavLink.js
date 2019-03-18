import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/index";

class ChannelNavLink extends Component {
  render() {
    const { channel } = this.props;
    return (
      <div className="row">
        <div className="col-12 my-1">
          <Link
            to={`/channels/${channel.id}`}
          >
            <span># </span> {channel.name}
          </Link>
        </div>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     getChannel: (ch) => dispatch(actionCreators.getChannel(ch))
//   };
// };

// export default connect(
//   null,
//   mapDispatchToProps
// )(ChannelNavLink);


export default ChannelNavLink