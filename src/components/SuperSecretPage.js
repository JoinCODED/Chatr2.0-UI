import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { fetchChannels } from "../redux/actions";
import pic from "../assets/images/welcome.gif";
import Bot from "./CustomChatbot";
class SuperSecretPage extends Component {
  render() {
    if (!this.props.user) return <Redirect to="/login" />;

    return (
      <div>
        <center>
          <div
            className="card"
            style={{
              width: "50%",
              height: "50%",
              opacity: "0.9",
              marginTop: "3%",
            }}
          >
            <img className="card-img" src={pic} />
            <div
              className="card-img-overlay text-center"
              style={{
                textShadow:
                  "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff",
              }}
            >
              <h2 className="">Hi {this.props.user.username} .. </h2>
              <h2>Welcome to ChatMelon 2.0</h2>
            </div>
          </div>
        </center>

        <center>
          <button
            type="button"
            className="btn btn-success btn-lg btn-block mt-2"
            style={{ width: "80%", opacity: "0.9" }}
          >
            <a className="text-white" href={"https://www.google.com/"}>
              Very helpful website
            </a>
          </button>

          <button
            type="button"
            className="btn btn-success btn-lg btn-block mt-2"
            style={{ width: "80%", opacity: "0.9" }}
          >
            <a
              className="text-white"
              href={
                "https://www.google.com/search?q=watermelon&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiknerl78_oAhUBMewKHYYPDGUQ_AUoAXoECBgQAw&biw=1920&bih=969"
              }
            >
              Press here if you want to feel better
            </a>
          </button>
          <button
            type="button"
            className="btn btn-danger btn-lg btn-block mt-2"
            style={{ width: "80%", opacity: "0.9" }}
          >
            <a
              className="text-white"
              href={"https://www.youtube.com/watch?v=bNJfN-iAcys"}
            >
              What is this?????
            </a>
          </button>
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToprops = (dispatch) => ({
  fetch: () => dispatch(fetchChannels()),
});

export default connect(mapStateToProps, mapDispatchToprops)(SuperSecretPage);
