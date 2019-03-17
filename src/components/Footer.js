import React from "react";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="row my-4 justify-content-md-center">
      <span className="footer ">
        <span>Made with </span>
        <FontAwesomeIcon className="heart" icon={faHeart} />
        <span> by Ayman & Abdullah</span>
      </span>
    </div>
  );
};

export default Footer;
