import React, { Component } from 'react';
import { login } from '../Actions/AuthAction'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

function SignIn(props) {
    const auth = {
        displayName: "Incognito",
        avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
        coin: 9999999,
        infor: "Forest Network là một mạng xã hội phi tập trung (decentralized social network) dựa trên công nghệ chuỗi khối (blockchain technology)",
        followers: [
            {
                uid :"u1",
                avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
                displayName: "User 1",
                followers: "112",
                isFollow: true,
            },
            {
                uid :"u2",
                avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
                displayName: "User 2",
                followers: "13",
                isFollow: false,
            },
            {
                uid :"u3",
                avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
                displayName: "User 3",
                followers: "14",
                isFollow: false,
            },
        ],
        following: [
            {
                uid :"u1",
                avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
                displayName: "User 1",
                followers: "112",
            },
            {
                uid :"u7",
                avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
                displayName: "User 7",
                followers: "42",
            },
        ],
    }
    if (props.auth)
        return <Redirect to='/Home' />
    else
        return <div className="App">
            <div className="signin">
                <h2>Welcome to</h2>
                <h1>Forest<span>Network</span>  </h1>
                <p> Forest Network  is a decentralized social network<br></br> based on blockchain technology</p>
                <div class="interaction">
                    <div className="register">TO REGISTER</div>
                    <div className="login"
                        onClick={() => { props.dispatch(login(auth)) }}
                    >Login</div>
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
)(SignIn);