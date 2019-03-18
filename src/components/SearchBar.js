import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


import { connect } from "react-redux";


class SearchBar extends Component {
  render() {
    console.log("this.props.key", this.props.name)
    return (
     
        <div className="col-12">
          <input
            className="form-control form-field-format"
            type="text"
            onChange={event => this.props.filter(event.target.value)}
            placeholder="Search. . ."
          />
        </div>
    );
  }
}

export default SearchBar;