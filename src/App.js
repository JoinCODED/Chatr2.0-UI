import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import { connect } from "react-redux";

// Actions
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
import ChannelCreateForm from "./components/ChannelCreateForm";

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
          <Route path="/createChannel" component={ChannelCreateForm} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
