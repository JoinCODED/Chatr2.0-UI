import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { checkForExpiredToken } from "./store/actions/authentication";
import * as actionCreators from "./store/actions";
import { connect } from "react-redux";


// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import messages from "./components/messages";
import CreateChannelForm from "./components/Navigation/CreateChannelForm";
import SendMessageForm from "./components/SendMessageForm";

class App extends Component {
  componentDidMount() {
    main();
    this.props.checkForExpiredToken();
  }

  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Route path="/channel/:channelID/" component={messages} />
          <Route path="/createChannel/" component={CreateChannelForm} />
          {/* <Route path="/message/" component={SendMessageForm} /> */}
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken()),
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);

