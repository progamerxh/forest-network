import React, { Component } from 'react';
import { login } from '../Actions/AuthAction'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Keypair } from 'stellar-base'
import axios from 'axios'
import { decode } from '../lib/tx/v1'

// Email: xuanhiep28697@gmail.com
// publicKey: GAMKCQ2STC3NLPEHMYKQCT7MPBRB33YTQ2SJGDTYY3245QLREJX3VXHP
// secretKey: SCN2JJCHUKNEHMPE5W6KWGMVB6LCKKMLD7JLQQAOJDPB2NYALHHFG6JC
// Email: vipmrak97h@gmail.com
// publicKey: GA3GUNBIZ3CPADC53GMM24TKF7B7ILTJZ3VOXBAUSPM7ILPUZ2ECTRE6
// secretKey: SAD6LNC7KB56TZILDBE63XVF4VVLN3VDXRJUUNY7YJEYCZJL4GJO6QQM
// Email: 1512169@student.hcmus.edu.vn
// publicKey: GAJDT2HYYIBPAPSTCCUETUXCCFBG6NB62O43MXLD55MP76T7IDPE5QR7
// secretKey: SCQ4BCKFWK3KB62F45RQCWLOF5VSDFG4BC3JCOKDBTP5FZFXYJTAPL2Y
const serverurl = "http://localhost:3010/";
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'SCN2JJCHUKNEHMPE5W6KWGMVB6LCKKMLD7JLQQAOJDPB2NYALHHFG6JC',
            action: '',
            warn: '',
        }
        this.textHandleChange = this.textHandleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    textHandleChange(e) {
        this.setState({ text: e.target.value });
    }

    submitHandler(e) {
        e.preventDefault();
        this.login();
    }

    login() {
        const key = Keypair.fromSecret(this.state.text);
        const query = serverurl + `api/accounts/${key.publicKey()}`
        axios.get(query)
            .then(response => {
                if (response.data) {
                    const { address, name, balance, followings, sequence, picture, bandwidth, bandwidthTime } = response.data;
                    const auth = {
                        address,
                        name: name ? name : address,
                        balance: Number(balance),
                        sequence: Number(sequence),
                        picture,
                        bandwidth,
                        bandwidthTime,
                        publicKey: key.publicKey(),
                        secret: key.secret(),
                        infor: "",
                        followers: [],
                        followings: followings ? followings : [],
                    }
                    localStorage.setItem("Secret", key.secret());
                    this.props.dispatch(login(auth));
                    this.setState({ warn: '' })
                }
                else {
                    this.setState({ warn: "Account not found!" })
                }
            })
            .catch(err => console.log(err));
    }
    render() {
        if (this.props.auth)
            return <Redirect to='/Home' />
        else
            return <div className="App"
                style={{
                    background: `url("https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/rbGMAGytlGjahhgrii/videoblocks-global-network-in-digital-cyberspace-financial-or-social-background-animation-4k-loopable-3d-rendering-suitable-for-cryptocurrency-blockchain-social-background_rqvlwmzlm_thumbnail-full01.png") center no-repeat`,
                    backgroundSize: `cover`
                }}
            >
                <div className="signin">
                    <h2>Welcome to</h2>
                    <h1>Forest<span>Network</span>  </h1>
                    {(this.state.warn) ? (<p>{this.state.warn}</p>)
                        : (<p> Forest Network  is a decentralized social network<br></br> based on blockchain technology</p>)}

                    {(this.state.action === 'login') ? (
                        <div className="loginform">
                            <form onSubmit={this.submitHandler}>
                                <input
                                    autoFocus
                                    className="private"
                                    type="text"
                                    aria-label="Private key"
                                    placeholder="Private key"
                                    onChange={this.textHandleChange}
                                    value={this.state.text}
                                />
                                <i id="login" className="fa fa-arrow-right"
                                    onClick={() => { this.login() }} />
                                <i id="cancel" className="fa fa-times"
                                    onClick={() => {
                                        this.setState({ action: '' });
                                    }} />
                            </form>
                        </div>
                    ) : (
                            <div className="interaction">
                                <div className="register"
                                    onClick={() => {
                                        const key = Keypair.random();
                                        this.setState({
                                            warn: `Please save these key:
                                        Public: ${key.publicKey()}
                                        Secret: ${key.secret()}`
                                        })
                                    }}
                                >GENERATE KEY</div>
                                <div className="login"
                                    onClick={() => { this.setState({ action: 'login' }) }}
                                >Login</div>
                            </div>
                        )}
                </div>
            </div>
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
};

export default connect(
    mapStateToProps,
)(SignIn);