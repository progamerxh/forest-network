import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import enStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { showcomment, loadposts, refreshposts, showreact } from '../Actions/PostAction';
import UploadForm from './UploadForm';
import Comment from './Comment';
import Reaction from './Reaction';
import axios from 'axios'
import { decode, PlainTextContent, ReactContent } from '../lib/tx/v1'
import { asyncForEach, serverurl, defaultavt } from '../lib/Helper'
import InfiniteScroll from 'react-infinite-scroller';
import { exploreuser } from '../Actions/UserAction';
import ReactHtmlParser from 'react-html-parser';
import { broadcastTx } from '../Actions/ApiAction';
import socketIOClient from "socket.io-client";
import '../Stylesheets/Emoji.scss';
import { withRouter } from "react-router-dom";

const formatter = buildFormatter(enStrings)

class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
        }
    }
    componentDidMount() {
        const socket = socketIOClient(serverurl);
        socket.on("newpost", data => {
            var myDiv = document.getElementById('newsfeeddiv');
            if (myDiv && myDiv.scrollTop === 0) {
                this.props.dispatch(refreshposts());
            }
        });
        socket.emit("register", { role: 'newsfeed', address: this.props.auth.address });

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userprofile != nextProps.userprofile) {
            this.props.dispatch(refreshposts());
            this.setState({ hasMore: true });
        }
    }
    async loadPosts() {
        const { page } = this.props.newsfeed;
        const query = `api/transactions/author=${this.props.userprofile ? this.props.userprofile.address : ''}/type=post/page=${page}`;
        // const query = this.props.userprofile ?  `api/transactions/author=${this.props.userprofile.address}/type=post/page=${page}` : `api/newsfeed/${this.props.auth.address}/page=${page}`;
        const txlist = await axios.get(serverurl + query)
            .then(response => response.data)
            .catch(err => {
                console.log(err);
                return [];
            });
        if (txlist.length === 0) {
            this.setState({ hasMore: false });
            return;
        }
        var posts = [];
        await asyncForEach(txlist, async (tx) => {
            const txdecoded = decode(Buffer.from(tx.data.data));
            const user = await axios.get(serverurl + `api/accounts/${tx.author}`)
                .then(res => res.data);
            if (true) {
                var content = {};
                try {
                    content = PlainTextContent.decode(txdecoded.params.content);
                }
                catch (err) {
                    content.text = "ERROR: Wrong format >" + txdecoded.params.content;
                }
                var author = user;
                author.picture = (user.picture) ? user.picture : null;
                author.name = user.name ? user.name : user.address;
                author.balance = Number(user.balance);
                const post = {
                    hash: tx.hash,
                    author: author,
                    content: {
                        text: content.text,
                        photoUrl: null,
                        taglist: [],
                        timeuploaded: tx.createdAt,
                    },
                    interaction: {
                        reacts: tx.reactcount,
                        comments: tx.commentcount,
                        shares: null,
                    },
                    showComment: false,
                }
                posts.push(post);
            }
        });
        await this.props.dispatch(loadposts(posts));
    }

    handleReact(objecthash, type) {
        const hash = objecthash;
        const params = {
            object: hash,
            content: ReactContent.encode({
                type: 2,
                reaction: type,
            }),
        };
        console.log(params);
        this.props.dispatch(broadcastTx({ params, operation: "interact" }));
    }

    componentWillUnmount() {
        this.props.dispatch(refreshposts())
    }
    render() {
        const reactype = ["Like", "Love", "Haha", "Wow", "Sad", "Angry"]
        const isAuthProfile = (!this.props.userprofile || this.props.userprofile.address === this.props.auth.address) ? true : false;
        const { posts } = this.props.newsfeed;
        const loader = <div className="fluid-centered" key={0}>Loading...</div>;
        return <div id="newsfeeddiv" className="mid" >
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadPosts.bind(this)}
                hasMore={this.state.hasMore}
                threshold={150}
                useWindow={false}
                loader={loader}>

                <UploadForm
                    style={isAuthProfile ? {} : { display: `none` }}
                />
                <div className="clear-fix"></div>
                <div className="newsfeed">
                    <ul className="newslist">
                        {posts.map((post, index) => {
                            if (post.author.picture) {
                                post.avatar = "data:image/jpeg;base64," + Buffer.from(post.author.picture).toString('base64');
                            }
                            return <div key={index}>
                                <li className="item">
                                    <div className="user">
                                        <div className="useravatar"
                                            onClick={() => {
                                                this.props.history.push(`/profile/${post.author.address}`);
                                                this.props.dispatch(exploreuser(post.author))
                                            }} >
                                            <img className="avt" src={post.avatar ? post.avatar : defaultavt}
                                                alt=''></img>
                                        </div>
                                        <div className="infor">
                                            <div className="name"
                                                onClick={() => {
                                                    this.props.history.push(`/profile/${post.author.address}`);
                                                    this.props.dispatch(exploreuser(post.author))
                                                }}>{post.author.name}</div>
                                            <div className="followcount">
                                                <i className="fa fa-user" ></i>
                                                {post.author.followers}
                                            </div>
                                            <div className="timeuploaded">
                                                <i className="fa fa-clock-o" ></i>
                                                <TimeAgo date={new Date(post.content.timeuploaded)} formatter={formatter} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <div className="text"
                                            style={{ WebkitBoxOrient: `vertical` }}
                                        >
                                            {ReactHtmlParser(post.content.text)}
                                        </div>
                                        {(post.content.photoUrl !== "") ?
                                            (
                                                <img className="photo" src={post.content.photoUrl}></img>
                                            ) : (null)
                                        }
                                        {(post.content.taglist) ? (
                                            <div className="taglist">
                                                {post.content.taglist.map((tag, index) => {
                                                    return <span key={index} className="tagitem">
                                                        {tag}
                                                    </span>
                                                })
                                                }
                                            </div>
                                        ) : (null)
                                        }

                                        <div className="interaction">
                                            <div className="reacts">
                                                <button className="fa fa-heart-o"
                                                >
                                                    <div className="emoji-container">
                                                        {reactype.map((react, index) => {
                                                            return <div
                                                                key={index}
                                                                className={`emoji ${react.toLowerCase()}`}
                                                                onClick={() => {
                                                                    this.handleReact(post.hash, index + 1);
                                                                }
                                                                }>
                                                                <div className="icon" data-title={react}>
                                                                </div>
                                                            </div>
                                                        })}
                                                    </div>
                                                </button>
                                                {post.interaction.reacts ? (
                                                    <a
                                                        onClick={() => {
                                                            this.props.dispatch(showreact(post.hash));
                                                        }}>
                                                        {post.interaction.reacts}</a>
                                                ) : null}
                                            </div>
                                            <div className="hover comments">
                                                <a
                                                    onClick={() => {
                                                        this.props.dispatch(showcomment(post.hash));
                                                    }}>
                                                    <i className="fa fa-comment-o" ></i>
                                                    {post.interaction.comments}
                                                </a>
                                            </div>
                                            <div className="hover shares">
                                                <a onClick={() => {
                                                    console.log(post.hash);
                                                }}>
                                                    <i className="fa fa-share" ></i>
                                                    {post.interaction.shares}
                                                </a>
                                            </div>
                                        </div>
                                        {(post.showComment) ? (
                                            <Comment hash={post.hash} />
                                        ) : (null)}
                                        {(post.showReact) ? (
                                            <Reaction hash={post.hash} />
                                        ) : (null)}
                                    </div>
                                </li>
                                <div className="clear-fix"></div>
                            </div>
                        })
                        }
                    </ul>
                </div >
            </InfiniteScroll>
        </div>
    }
}
const mapStateToProps = state => {
    return {
        newsfeed: state.newsfeed,
        userprofile: state.userprofile,
        auth: state.auth,
    }
};

export default withRouter(connect(
    mapStateToProps,
)(NewsFeed));