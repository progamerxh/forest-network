import React, { Component } from 'react';
import { connect } from 'react-redux';

function UserInfor(props) {

    return
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
};

export default connect(
    mapStateToProps,
)(UserInfor);