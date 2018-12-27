import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { serverurl, base64Img, defaultavt, asyncForEach } from '../lib/Helper';
import { decode } from '../lib/tx/index'
import { ReactContent } from '../lib/tx/v1';
import { withRouter } from "react-router-dom";
import { exploreuser } from '../Actions/UserAction';

class Reaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reacts: [],
        }
    }
    componentDidMount() {
        this.loadReacts();
    }
    async loadReacts() {
        const query = `api/transactions/react/hash=${this.props.hash}/type=react`
        const txlist = await axios.get(serverurl + query)
            .then(response => response.data)
            .catch(err => {
                console.log(err);
                return [];
            });
        if (!txlist.reacts) {
            return;
        }
        var reacts = [];
        await asyncForEach(txlist.reacts, async (txhash) => {
            const tx = await axios.get(serverurl + `api/transactions/hash=${txhash}`)
                .then(res => res.data);
            const txdecoded = decode(Buffer.from(tx.data))
            const user = await axios.get(serverurl + `api/accounts/${txdecoded.account}`)
                .then(res => res.data);
            var reaction = '';
            try {
                reaction = ReactContent.decode(txdecoded.params.content).reaction;
            }
            catch (err) {
                reaction = "ERROR: Wrong format >";
            }
            const reactype = ["👍", "😍", "😂", "😲", "😢", "😡"]
            var author = user;
            author.picture = (user.picture) ? user.picture : null;
            author.name = user.name ? user.name : user.address;
            author.balance = Number(user.balance);
            const react = {
                author,
                reaction: reactype[reaction - 1]
            }
            reacts.push(react);
        });
        this.setState({ reacts });
    }
    render() {

        return <div className="react">
            <div className="reactlist">
                <ul>
                    {this.state.reacts.map((react, index) => {
                        const avatar = react.author.picture ? base64Img(react.author.picture) : null;
                        return <li key={index}>
                            <img className="avt"
                                src={avatar ? avatar : defaultavt}
                                onClick={() => {
                                    this.props.history.push(`/profile/${react.author.address}`);
                                    this.props.dispatch(exploreuser(react.author))
                                }}
                            ></img>
                            <div className="content">
                                <div className="wrap">
                                    <span className="name"
                                     onClick={() => {
                                        this.props.history.push(`/profile/${react.author.address}`);
                                        this.props.dispatch(exploreuser(react.author))
                                    }}>
                                        <a className="username">{react.author.name}</a>
                                        <a className="reaction">
                                            {react.reaction}
                                        </a>
                                    </span>

                                </div>
                            </div>
                        </li>
                    })
                    }
                </ul>
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

export default connect(
    mapStateToProps,
)(Reaction);