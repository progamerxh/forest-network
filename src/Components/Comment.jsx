import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { serverurl, base64Img, defaultavt, asyncForEach } from '../lib/Helper';
import { decode, sign, encode } from '../lib/tx/index'
import { PlainTextContent } from '../lib/tx/v1';
import TimeAgo from 'react-timeago';
import enStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { broadcastTx } from '../Actions/ApiAction';
import { withRouter } from "react-router-dom";
import { exploreuser } from '../Actions/UserAction';
import socketIOClient from "socket.io-client";

const formatter = buildFormatter(enStrings)
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            text: '',
        }
        this.textHandleChange = this.textHandleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    textHandleChange(e) {
        this.setState({ text: e.target.value });
    }

    submitHandler(e) {
        e.preventDefault();
        const params = {
            object: this.props.hash,
            content: PlainTextContent.encode({
                type: 1,
                text: this.state.text,
            })
        }
        this.props.dispatch(broadcastTx({ params, operation: "interact" }));
        this.setState({ text: '' });

    }
    componentDidMount() {
        this.loadComments();
        const socket = socketIOClient(serverurl);
        socket.on("newcomment", data => {
            console.log(`newcomment`, data);
            this.loadComments();
        });
        socket.emit("register", { role: 'comment', objecthash: this.props.hash });
    }
    async loadComments() {
        const query = `api/transactions/react/hash=${this.props.hash}/type=comment`
        const txlist = await axios.get(serverurl + query)
            .then(response => response.data)
            .catch(err => {
                console.log(err);
                return [];
            });
        if (!txlist.comments) {
            return;
        }
        var comments = [];
        await asyncForEach(txlist.comments, async (txhash) => {
            const tx = await axios.get(serverurl + `api/transactions/hash=${txhash}`)
                .then(res => res.data);
            console.log(tx.data);
            const txdecoded = decode(Buffer.from(tx.data))
            const user = await axios.get(serverurl + `api/accounts/${txdecoded.account}`)
                .then(res => res.data);
            var content = '';
            try {
                content = PlainTextContent.decode(txdecoded.params.content).text;
            }
            catch (err) {
                content = "ERROR: Wrong format >" + txdecoded.params.content;
            }
            var author = user;
            author.picture = (user.picture) ? user.picture : null;
            author.name = user.name ? user.name : user.address;
            author.balance = Number(user.balance);
            const comment = {
                author,
                time: tx.createdAt,
                content
            }
            comments.push(comment);
        });
        this.setState({ comments });
    }
    render() {
        const avatar = this.props.auth.picture ? base64Img(this.props.auth.picture.data) : null;
        return <div className="comment">
            <div className="commentlist">
                <ul>
                    {this.state.comments.map((comment, index) => {
                        const avatar = comment.author.picture ? base64Img(comment.author.picture.data) : null;
                        return <li key={index}>
                            <img className="avt"
                                src={avatar ? avatar : defaultavt}
                                onClick={() => {
                                    this.props.history.push(`/profile/${comment.author.address}`);
                                    this.props.dispatch(exploreuser(comment.author))
                                }}
                            ></img>
                            <div className="content">
                                <div className="wrap">
                                    <span className="name">
                                        <a className="username"
                                            onClick={() => {
                                                this.props.history.push(`/profile/${comment.author.address}`);
                                                this.props.dispatch(exploreuser(comment.author))
                                            }}
                                        >{comment.author.name}</a>
                                        <a className="time">
                                            <TimeAgo date={new Date(comment.time)} formatter={formatter} />
                                        </a>
                                    </span>
                                    {comment.content}
                                </div>
                            </div>
                        </li>
                    })
                    }
                </ul>
            </div>
            <div className="commentsubmit">
                <img className="avt"
                    src={avatar ? avatar : defaultavt}
                ></img>
                <form onSubmit={this.submitHandler}>
                    <input
                        placeholder="Add comment..."
                        type="text"
                        value={this.state.text}
                        onChange={this.textHandleChange}
                    ></input>
                </form>
            </div>
        </div>
    }
}
const mapStateToProps = state => {
    return {
        navigate: state.navigate,
        auth: state.auth,
    }
};

export default withRouter(connect(
    mapStateToProps,
)(Comment));