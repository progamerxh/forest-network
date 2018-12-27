import React, { Component } from 'react';
import { connect } from 'react-redux';
import { asyncForEach, serverurl, base64Img, defaultavt } from '../lib/Helper'
import axios from 'axios'
import { loadusers, refreshusers, userloadend } from '../Actions/UserAction';
import InfiniteScroll from 'react-infinite-scroller';
import Users from '../Components/Users';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMore: true,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.searchresult.minisearch !== this.props.searchresult.minisearch || nextProps.userprofile !== this.props.userprofile) {
            this.props.dispatch(refreshusers());
        }
    }
    loadUsers = async () => {
        const minisearch = this.props.searchresult.minisearch
        var page = this.props.userlist.page;
        var query = serverurl + `api/accounts/page=${page}`;
        if (this.props.role === "userfollow") {
            query = serverurl + `api/accounts/followings/${this.props.userprofile.address}/page=${page}`;
        } else if (minisearch) {
            query = serverurl + `api/accounts/search=${minisearch}/page=${page}`;
        }
        const accounts = await axios.get(query)
            .then(response => response.data)
            .catch(err => {
                console.log(err);
                return [];
            });
        if (accounts.length === 0) {
            this.props.dispatch(userloadend());
        }
        var users = [];
        await asyncForEach(accounts, async (account) => {
            const { address, name, picture, balance, sequence, bandwidth, bandwidthTime } = account;
            const user = {
                address,
                name: name ? name : address,
                picture,
                balance: Number(balance),
                sequence: Number(sequence),
                bandwidth,
                bandwidthTime
            }
            users.push(user);
        });
        await this.props.dispatch(loadusers(users));
    }
    componentWillUnmount() {
        this.props.dispatch(refreshusers());
    }
    render() {
        const loader = <div className="fluid-centered" key={0}>Loading...</div>;
        const { users } = this.props.userlist;
        const { followings } = this.props.auth;
        return <div className="content">
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadUsers.bind(this)}
                hasMore={this.props.userlist.hasMore}
                threshold={20}
                useWindow={false}
                loader={loader}>
                <Users users={users}
                    followings={followings}
                    dispatch={this.props.dispatch}
                />
            </InfiniteScroll>
        </div>
    }
}
const mapStateToProps = state => {
    return {
        userlist: state.userlist,
        auth: state.auth,
        searchresult: state.searchresult,
        followtype: state.followtype,
        userprofile: state.userprofile
    }
};

export default connect(
    mapStateToProps,
)(UserList);
