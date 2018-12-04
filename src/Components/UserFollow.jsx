import React, { Component } from 'react';
import { connect } from 'react-redux';
import { followtype } from '../Actions/UserAction'

function UserFollow(props) {
    const userlist = (props.followtype === "Follower") ? props.auth.followers : props.auth.following;
    const isFollow = (props.followtype === "Following") ? true : false;
    return <div className="right">
        <div className="yourfollow">
            <ul className="followtype">
                <li className="item" onClick={() => { props.dispatch(followtype("Follower")) }}>
                    <a className={(props.followtype === "Follower") ? "active" : ""}>Follower</a>
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
                                    <div className="follow">
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