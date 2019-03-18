import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ChannelInterface from "./components/ChannelInterface";

// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import CreateChannel from "./components/CreateChannel";

class App extends Component {
  componentDidMount() {
    main();
  }

  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <Route path="/channels/create" component={CreateChannel} />
          <Route path="/channels/:channelID" component={ChannelInterface} />
          <PrivateRoute path="/private" component={SuperSecretPage} />

          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
