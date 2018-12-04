import React, { Component } from 'react';
import { connect } from 'react-redux';

function UserList(props) {

    return <div className="content">
        <ul className="userlist">
            {props.userlist.map((user, index) => {
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
                        <div className="follow">
                            Follow
                        </div>
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
    }
};

export default connect(
    mapStateToProps,
)(UserList);