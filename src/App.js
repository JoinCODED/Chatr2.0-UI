import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./assets/scss/styles.scss";
import "./styles.css";
// Scripts
import main from "./assets/js/main";

// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import CreateChannel from "./components/CreateChannel";
import ChannelDetail from "./components/ChannelDetail";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import BG from "./BG";

class App extends Component {
  componentDidMount() {
    main();
  }

  render() {
    return (
      <div className=" background content-wrapper text-white">
        <NavBar />

        <Switch>
          <Route path="/channels/:channelID" component={ChannelDetail} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/createChannel" component={CreateChannel} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <Route path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        <Route path="/" component={BG} />

        <Footer />
      </div>
    );
  }
}

export default App;
