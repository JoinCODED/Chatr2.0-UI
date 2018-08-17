import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Components
import NavBar from "./components/Navigation/NavBar";
import AuthModals from "./components/Modals/AuthModals";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import SuperSecretPage from "./components/SuperSecretPage";
import Messages from "./components/Pages/Messages";

class App extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <AuthModals />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/channels/:channel_name/" component={Messages} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
