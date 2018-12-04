import React, { Component } from 'react';
import { connect } from 'react-redux';

function UserInfor(props) {

    return <div className="content">
        <div className="interaction">
            <div className="hover updateinfor">
                <a >
                    <i className="fa fa-edit" ></i>
                    Update information
                    </a>
            </div>
        </div>
        <p>{props.auth.infor}</p>
    </div>
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
};

export default connect(
    mapStateToProps,
)(UserInfor);