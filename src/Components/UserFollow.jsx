import React, { Component } from 'react';
import { connect } from 'react-redux';
import { followtype, exploreuser } from '../Actions/UserAction'
import { follow } from '../Actions/AuthAction'
import { base64Img, defaultavt } from '../lib/Helper';
import UserList from '../Containers/UserList';

class UserFollow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
        }
    }
    render() {
        return <div className="right">
            <div className="yourfollow">
                <ul className="followtype">
                    <li className="item" onClick={() => { this.props.dispatch(followtype("Following")) }}>
                        <a className={(this.props.followtype === "Following") ? "active" : ""}>Following</a>
                    </li>
                    <li className="item" onClick={() => { this.props.dispatch(followtype("Followers")) }}>
                        <a className={(this.props.followtype === "Followers") ? "active" : ""}>Followers</a>
                    </li>

                </ul>
            </div>
            <div className="clear-fix"></div>
            <UserList role="userfollow" />
        </div>
    }
}
const mapStateToProps = state => {
    return {
        followtype: state.followtype,
        auth: state.auth,
    }
};

export default connect(
    mapStateToProps,
)(UserFollow);