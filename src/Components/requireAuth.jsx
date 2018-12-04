import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default function (ComposedComponent) {

  class Authentication extends Component {
    static contextTypes = {
      auth: PropTypes.object
    };

    render() {
      if (this.props.auth) {
        return <ComposedComponent {...this.props} />;
      }
      return null;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}