import React, { Component } from 'react';
import { connect } from 'react-redux';
import { followtype } from '../Actions/UserAction'
import { follow } from '../Actions/AuthAction'

function UserFollow(props) {
    const userlist = (props.followtype === "Followers") ? props.auth.followers : props.auth.following;
    return <div className="right">
        <div className="yourfollow">
            <ul className="followtype">
                <li className="item" onClick={() => { props.dispatch(followtype("Followers")) }}>
                    <a className={(props.followtype === "Followers") ? "active" : ""}>Followers</a>
                </li>
                <li className="item" onClick={() => { props.dispatch(followtype("Following")) }}>
                    <a className={(props.followtype === "Following") ? "active" : ""}>Following</a>
                </li>
            </ul>
        </div>
        <div className="clear-fix"></div>
        <div className="followlist">
            <ul className="userlist">
                {userlist.map((user, index) => {
                    var isFollow = (props.followtype === "Following") ? true : false;
                    if (!isFollow)
                        isFollow = user.isFollow;
                    return <li className="item" key={index} >
                        <img className="avt" src={user.avatarUrl} ></img>
                        <div className="content">
                            <div className="infor">
                                <div className="name">{user.displayName}</div>
                            </div>
                            <div className="followcount">
                                <i className="fa fa-user" ></i>
                                {user.followers}
                            </div>
                            {(isFollow) ? (
                                <div className="followed">
                                    <i className="fa fa-check" ></i>
                                    Following
                                </div>
                            ) : (
                                    <div className="follow"
                                        onClick={() => {
                                            props.dispatch(follow(user))
                                        }}
                                    >
                                        Follow
                                    </div>
                                )
                            }

                        </div>
                    </li>
                })
                }

            </ul>
        </div>
    </div>
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