import React, { Component } from 'react';
import { base64Img, defaultavt } from '../lib/Helper';
import { exploreuser } from '../Actions/UserAction';
import { follow, unfollow } from '../Actions/AuthAction';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { navigate } from '../Actions/NavAction';


function Users(props) {
    const { users, followings, dispatch } = props;
    return <ul className="userlist">
        {users.map((user, index) => {
            var isFollow = false;
            user.avatar = (user.picture) ? base64Img(user.picture.data) : null;
            for (var i in followings)
                if (user.address === followings[i])
                    isFollow = true;
            return <li className="item" key={index}>
                <div className="useravatar"
                    onClick={() => {
                        dispatch(exploreuser(user));
                        props.history.push(`/profile/${user.address}`);
                    }}>
                    <img className="avt" src={user.avatar ? user.avatar : defaultavt} alt=""></img>
                </div>
                <div className="content">
                    <div className="infor">
                        <div className="name">{user.name}</div>
                    </div>
                    <div className="followcount">
                        <i className="fa fa-user" ></i>
                        {user.followers}
                    </div>
                    {(isFollow) ? (
                        <div className="followed"
                        onClick={() => {
                            dispatch(unfollow(user.address))
                        }}>
                            <i className="fa fa-check" ></i>
                            Following
                </div>
                    ) : (
                            <div className="follow"
                                onClick={() => {
                                    dispatch(follow(user.address))
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
}

const mapStateToProps = state => {
    return {
    }
};

export default withRouter(connect(
    mapStateToProps,
)(Users));