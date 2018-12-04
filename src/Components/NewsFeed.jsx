import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import enStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { showcomment } from '../Actions/PostAction'

const formatter = buildFormatter(enStrings)

function NewsFeed(props) {
    return <div className="newsfeed">
        <ul className="newslist">
            {props.posts.map((post, index) => {
                console.log(post.showComment);
                return <div key={index}>
                    <li className="item">
                        <div className="user">
                            <img className="avt" src={post.avatarUrl} ></img>
                            <div className="infor">
                                <div className="name">{post.displayName}</div>
                                <div className="followcount">
                                    <i className="fa fa-user" ></i>
                                    {post.followers}
                                </div>
                                <div className="timeuploaded">
                                    <i className="fa fa-clock-o" ></i>
                                    <TimeAgo date={post.content.timeuploaded} formatter={formatter} />
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="text">
                                {post.content.text}
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
                                <div className="hover faves">
                                    <a>
                                        <i className="fa fa-heart-o" ></i>
                                        {post.interaction.faves}
                                    </a>
                                </div>
                                <div className="hover comments">
                                    <a
                                     onClick={() => { props.dispatch(showcomment(post.postid)) }}>
                                        <i className="fa fa-comment-o" ></i>
                                        {post.interaction.comments}
                                    </a>
                                </div>
                                <div className="hover shares">
                                    <a>
                                        <i className="fa fa-share" ></i>
                                        {post.interaction.shares}
                                    </a>
                                </div>
                            </div>
                            {(post.showComment) ? (
                                <div className="comment">
                                    <div className="commentlist">
                                        <ul>
                                            <li>
                                                <img className="avt"
                                                    src="http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png"
                                                ></img>
                                                <div className="content">
                                                    <div className="wrap">
                                                        <span className="name">
                                                            <a>User 1</a>
                                                        </span>
                                                        'Switch' is defined but never used'Switch' is defined but never used'Switch' is defined but never used'Switch' is defined but never used'Switch' is defined but never used
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <img className="avt"
                                                    src="http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png"
                                                ></img>
                                                <div className="content">
                                                    <div className="wrap">
                                                        <span className="name">
                                                            <a>User 1</a>
                                                        </span>
                                                        'Switch' is defined but never used'Switch' is defined but never used'Switch' is defined but never used'Switch' is defined but never used'Switch' is defined but never used
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="commentsubmit">
                                        <img className="avt"
                                            src="http://droidlessons.com/wp-content/uploads/2016/11/Cogn_mode.png"
                                        ></img>
                                        <form>
                                            <input
                                                type="text"
                                            ></input>
                                        </form>
                                    </div>
                                </div>
                            ) : (null)}
                        </div>
                    </li>
                    <div className="clear-fix"></div>
                </div>
            })
            }
        </ul>
    </div>
}
const mapStateToProps = state => {
    return {
        posts: state.posts,
    }
};

export default connect(
    mapStateToProps,
)(NewsFeed);