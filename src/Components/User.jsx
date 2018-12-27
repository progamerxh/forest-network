import React, { Component } from 'react';
import { follow, logout, fetchauth, updatesequence, updateaccount } from '../Actions/AuthAction'
import { connect } from 'react-redux';
import { base64Img, defaultavt, serverurl } from '../lib/Helper';
import { encode, sign } from '../lib/tx/index'
import vstruct from 'varstruct'
import base32 from 'base32.js'
import socketIOClient from "socket.io-client";
import { broadcastTx } from '../Actions/ApiAction';
import Axios from 'axios';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edittext: '',
            isEditName: false,
            isUploadPicture: false,
            file: null,
            previewImgUrl: null,
            binaryImg: null,
        };
        this.updatePicture = this.updatePicture.bind(this);
        this.editName = this.editName.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.removeFileHandler = this.removeFileHandler.bind(this);
        this.handleSubmitFollow = this.handleSubmitFollow.bind(this);

    }
    componentDidMount() {
        const socket = socketIOClient(serverurl);
        socket.emit("register", { role: 'user', address: this.props.auth.address });
        socket.on("update_sequence", data => {
            const { balance, sequence, bandwidth, bandwidthTime } = data;
            const auth = {
                balance: Number(balance),
                sequence: Number(sequence),
                bandwidth,
                bandwidthTime,
            }
            this.props.dispatch(updatesequence(auth));
        });
        socket.on("update_account", data => {
            Axios.get(serverurl + `api/accounts/${this.props.auth.address}`)
                .then(response => {
                    const { address, name, followings, picture } = response.data;
                    const auth = {
                        name: name ? name : address,
                        picture,
                        followings: followings ? followings : [],
                    }
                    this.props.dispatch(updateaccount(auth));
                })
        });


    }
    generatePreviewImgUrl(file, callback) {
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = e => callback(reader.result);
    }
    generateBinaryImg(file, callback) {
        const readerbinary = new FileReader();
        readerbinary.readAsArrayBuffer(file);
        readerbinary.onloadend = e => callback(e.target.result);
    }
    fileChangedHandler = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return
        }
        this.generatePreviewImgUrl(file, previewImgUrl => {
            var img = document.createElement("img");
            img.src = previewImgUrl;
            img.onload = () => {
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                var MAX_WIDTH = 720;
                var MAX_HEIGHT = 720;
                var width = img.width;
                var height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);
                var res = 1.0;
                do {
                    var dataurl = canvas.toDataURL('image/jpeg', res);
                    res = res - 0.1;
                    console.log(dataurl);
                } while (dataurl.length > 44000)
                var byteString = dataurl.split(',')[1];
                console.log(byteString);
                this.setState({ binaryImg: Buffer.from(byteString, 'base64') });

            }
            this.setState({ file, previewImgUrl });
        })
    }
    removeFileHandler() {
        this.setState({ file: null, previewImgUrl: null, isUploadPicture: false });
    }
    handleTextChange(e) {
        this.setState({ edittext: e.target.value });
    }
    handleSubmitFollow() {
        const addresses = this.props.auth.followings;
        const Followings = vstruct([
            { name: 'addresses', type: vstruct.VarArray(vstruct.UInt16BE, vstruct.Buffer(35)) },
        ]);
        const base32encoded = addresses.map(address => {
            return Buffer.from(base32.decode(address));
        })
        const params = {
            key: "followings",
            value: Followings.encode({ addresses: base32encoded }),
        };
        this.props.dispatch(broadcastTx(params,"update_account"));
    }

    editName() {
        if (this.state.edittext.trim() !== "") {
            const params = {
                key: "name",
                value: Buffer.from(this.state.edittext),
            };
            this.props.dispatch(broadcastTx({ params, operation: "update_account" }));
        }
        this.setState({ isEditName: false, edittext: '' });
    }
    updatePicture() {
        const params = {
            key: "picture",
            value: this.state.binaryImg,
        };
        this.props.dispatch(broadcastTx({ params, operation: "update_account" }));
    }
    render() {
        console.log(this.props.pendingFollowings);
        const auth = this.props.auth;
        const userprofile = this.props.userprofile;
        const isAuthProfile = (!userprofile || userprofile.address === auth.address) ? true : false;
        const pendingFollowings = this.props.pendingFollowings;
        var avatar = (this.state.previewImgUrl) ? this.state.previewImgUrl : (auth.picture) ? base64Img(auth.picture.data) : null;
        var name = auth.name;
        const editpicturestyle = (this.state.isUploadPicture) ? {} : { display: `none` };
        if (userprofile) {
            avatar = userprofile.picture ? base64Img(userprofile.picture.data) : null;
            name = this.props.userprofile.name;
            for (let i in auth.followings)
                if (userprofile.address === auth.followings[i])
                    userprofile.isFollow = true;
        }
        return <div className="user">
            <div className="logout">
                <i className="fa fa-sign-out" aria-hidden="true"
                    onClick={() => {
                        localStorage.clear();
                        this.props.dispatch(logout());
                    }}
                    title="Logout" />
            </div>
            <div className="useravatar">
                <img className="avatar"
                    src={avatar ? avatar : defaultavt}
                    alt=""
                ></img>
                <input id="uploadavatar" type="file" onChange={this.fileChangedHandler} />
                <label htmlFor="uploadavatar">
                    <i className="fa fa-camera"
                        title="Upload photo"
                        style={(this.state.isUploadPicture || !isAuthProfile) ? { display: `none` } : {}}
                        onClick={() => { this.setState({ isUploadPicture: true }) }} />
                </label>
                <i className="fa fa-check"
                    title="Save"
                    style={editpicturestyle}
                    onClick={() => {
                        this.updatePicture();
                        this.setState({ isUploadPicture: false })
                    }} />
                <i className="fa fa-times"
                    title="Cancel"
                    style={editpicturestyle}
                    onClick={this.removeFileHandler} />
            </div>
            {(!this.state.isEditName) ? (
                <p className="name">{name}
                    <i className="fa fa-edit"
                        title="Edit name"
                        style={!isAuthProfile ? { display: `none` } : {}}
                        onClick={() => { this.setState({ isEditName: true }) }} >
                    </i>
                </p>
            ) : (null)}
            {(this.state.isEditName) ? (
                <div className="edit">
                    <input
                        onChange={this.handleTextChange}
                        value={this.state.edittext}
                        type="text"
                        placeholder={(auth.name) ? auth.name : "Update name"}
                    ></input>
                    <div className="interaction">
                        <div className="hover ok">
                            <a onClick={this.editName} >
                                <i className="fa fa-check" ></i>
                                OK
                            </a>
                        </div>
                        <div className="hover cancel">
                            <a onClick={() => { this.setState({ isEditName: false }) }} >
                                <i className="fa fa-times" ></i>
                                Cancel
                            </a>
                        </div>
                    </div>
                </div>
            ) : (null)}
            {(!isAuthProfile) ? (
                (userprofile.isFollow) ? (
                    <div className="followed">
                        <i className="fa fa-check" ></i>
                        Following
                </div>
                ) : (
                        <div className="follow"
                            onClick={() => {
                                this.props.dispatch(follow(userprofile.address))
                            }}
                        >
                            Follow
                    </div>
                    )
            ) : (<div className="pendingfollow"
                style={(pendingFollowings.followings.length || pendingFollowings.unfollows.length) ? {} : { display: `none` }}>
                <div className="interaction">
                    <div className="hover submit">
                        <a onClick={this.handleSubmitFollow}>
                            <i className="fa fa-check" ></i>
                            {`${pendingFollowings.followings.length} follow\n${pendingFollowings.unfollows.length} unfollow`}
                        </a>
                    </div>
                </div>
            </div>)
            }
        </div >
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
        navigate: state.navigate,
        userprofile: state.userprofile,
        pendingFollowings: state.pendingFollowings,
    }
};

export default connect(
    mapStateToProps,
)(User);