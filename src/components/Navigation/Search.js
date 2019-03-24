// import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";

// import { connect } from "react-redux";

// import * as actionCreators from "./store/actions/index";

// class SearchBar extends Component {
//   render() {
//     return (
//       <div className="form-group col-lg-6 col-12 mx-auto">
//         <div className="input-group my-3">
//           <input
//             className="form-control"
//             type="text"
//             onChange={event => this.props.onSearch(event.target.value)}
//           />
//           <div className="input-group-append">
//             <span className="input-group-text">
//               <FontAwesomeIcon icon={faSearch} />
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     filteredChannels: state.channels.filteredChannels
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onSearch: query => dispatch(actionCreators.filterChannels(query))
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SearchBar);
