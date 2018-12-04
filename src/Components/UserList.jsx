import React, { Component } from 'react';
import { connect } from 'react-redux';
import { follow } from '../Actions/AuthAction';

function UserList(props) {
    const following = props.auth.following;
    return <div className="content">
        <ul className="userlist">
            {props.userlist.map((user, index) => {
                var isFollow = false;
                for (var i in following)
                    if (user.uid === following[i].uid)
                        isFollow = true;
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
}
const mapStateToProps = state => {
    return {
        userlist: state.userlist,
        auth: state.auth,
    }
};

export default connect(
    mapStateToProps,
)(UserList);