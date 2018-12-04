import React, { Component } from 'react';
import { connect } from 'react-redux';

function UserStat(props) {
    return <div className="userstat">
        <div className="coinremain">
            <div className="coin">
                <i className="fa fa-gg-circle" ></i>
                {props.auth.coin}
                    </div>
        </div>
    </div>
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
};

export default connect(
    mapStateToProps,
)(UserStat);