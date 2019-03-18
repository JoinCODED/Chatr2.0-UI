import React, { Component } from "react";
import background from "../assets/images/background.svg";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

class SuperSecretPage extends Component {
  render() {
    return (
      <div className="my-4 text-center">
        <br />
        <br />
        {/* <img src={background} style={{ width: 300 }} /> */}
        <br />
        <br />
        <br />
        <br />
        <h1>
          Welcome to our awesome chat{" "}
          <span>
            {" "}
            <FontAwesomeIcon className="heart" icon={faHeart} />
          </span>
        </h1>
      </div>
    );
  }
}

export default SuperSecretPage;
