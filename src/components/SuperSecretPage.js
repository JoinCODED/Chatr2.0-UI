import React, { Component } from "react";

class SuperSecretPage extends Component {
  render() {
    return (
      <header className="masthead d-flex mt-5">
        <div className="container text-center my-auto z-1">
        <h1>this page has all the secrets</h1>
        <p>now that you're logged in you can see this page</p>
      </div>
     </header>
    );
  }
}

export default SuperSecretPage;
