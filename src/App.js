import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import ChannelForm from "./components/ChannelForm";
import ChannelBoard from "./components/ChannelBoard";

import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";



class App extends Component {
  componentDidMount() {
    main();
    this.props.checkForExpiredToken()
    this.props.getAllChannels()
  }

  render() {

    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <PrivateRoute 
          path="/channels/:name"
          component={ChannelBoard} />
          <PrivateRoute path="/createChannel" component={ChannelForm} />
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
    getAllChannels: () => dispatch(actionCreators.getAllChannels()),
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);

