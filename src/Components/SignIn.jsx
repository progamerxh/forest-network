import React, { Component } from 'react';
import { login } from '../Actions/AuthAction'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Keypair } from 'stellar-base'

// Email: xuanhiep28697@gmail.com
// publicKey: GAMKCQ2STC3NLPEHMYKQCT7MPBRB33YTQ2SJGDTYY3245QLREJX3VXHP
// secretKey: SCN2JJCHUKNEHMPE5W6KWGMVB6LCKKMLD7JLQQAOJDPB2NYALHHFG6JC
// Email: vipmrak97h@gmail.com
// publicKey: GA3GUNBIZ3CPADC53GMM24TKF7B7ILTJZ3VOXBAUSPM7ILPUZ2ECTRE6
// secretKey: SAD6LNC7KB56TZILDBE63XVF4VVLN3VDXRJUUNY7YJEYCZJL4GJO6QQM
// Email: 1512169@student.hcmus.edu.vn
// publicKey: GAJDT2HYYIBPAPSTCCUETUXCCFBG6NB62O43MXLD55MP76T7IDPE5QR7
// secretKey: SCQ4BCKFWK3KB62F45RQCWLOF5VSDFG4BC3JCOKDBTP5FZFXYJTAPL2Y

function SignIn(props) {
    const auth = {
        displayName: "Incognito",
        avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
        coin: 9999999,
        infor: "Forest Network là một mạng xã hội phi tập trung (decentralized social network) dựa trên công nghệ chuỗi khối (blockchain technology)",
        followers: [
            {
                uid: "u1",
                avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
                displayName: "User 1",
                followers: "112",
                isFollow: true,
            },
            {
                uid: "u2",
                avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
                displayName: "User 2",
                followers: "13",
                isFollow: false,
            },
            {
                uid: "u3",
                avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
                displayName: "User 3",
                followers: "14",
                isFollow: false,
            },
        ],
        following: [
            {
                uid: "u1",
                avatarUrl: "http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png",
                displayName: "User 1",
                followers: "112",
            },
            {
                uid: "u7",
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
                <div className="interaction">
                    <div className="register"
                        onClick={() => {
                            const key = Keypair.random();
                            console.log(key.secret());
                            console.log(key.publicKey());
                        }}
                    >TO REGISTER</div>
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