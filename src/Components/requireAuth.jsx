import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Keypair } from "stellar-base/lib/keypair";
import { serverurl } from "../lib/Helper";
import Axios from "axios";
import { login } from "../Actions/AuthAction";

export default function (ComposedComponent) {

  class Authentication extends Component {
    static contextTypes = {
      auth: PropTypes.object
    };

    attempLogin() {
      const secret = localStorage.getItem('Secret');
      if (!secret)
        return;
      const key = Keypair.fromSecret(localStorage.getItem('Secret'));
      const query = serverurl + `api/accounts/${key.publicKey()}`
      Axios.get(query)
        .then(response => {
          const { address, name, balance, followings, sequence, picture, bandwidth, bandwidthTime } = response.data;
          const auth = {
            address,
            name: name ? name : address,
            balance: Number(balance),
            sequence: Number(sequence),
            picture,
            bandwidth,
            bandwidthTime,
            publicKey: key.publicKey(),
            secret: key.secret(),
            infor: "",
            followers: [],
            followings: followings ? followings : [],
          }
          this.props.dispatch(login(auth));
        })
        .catch(err => console.log(err));
    }
    render() {
      if (this.props.auth) {
        return <ComposedComponent {...this.props} />;
      }
      else
        this.attempLogin();
      return null;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(Authentication);
}