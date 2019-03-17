import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions";

// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import Channel from "./components/Channel";
import Messages from "./components/Messages";
import CreateChannelForm from "./components/ChannelForm"

class App extends Component {
  componentDidMount() {
    this.props.checkForExpiredToken();
    this.props.fetchChannels()
    main();
  }

  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <Route path="/channel/:channel" component={Channel}/>
          <Route path="/channel/:channelId/messages" component={Messages}/>
          <Route path="/CreateChannelForm" component={CreateChannelForm}/>
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/login" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken()),
    fetchChannels: () => dispatch(actionCreators.fetchChannels()),
  };
};
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
