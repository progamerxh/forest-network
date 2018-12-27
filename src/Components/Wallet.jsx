import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import enStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import InfiniteScroll from 'react-infinite-scroller';
import { serverurl, asyncForEach } from '../lib/Helper'
import base32 from 'base32.js'
import axios from 'axios';
import { decode } from '../lib/tx';
import { broadcastTx } from '../Actions/ApiAction';
/**
 * Number.prototype.format(n, x)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
Number.prototype.format = function (n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payments: [],
            isSend: false,
            isCreate: false,
            hasMore: true,
            page: 0,
            address: '',
            amount: 0,
        }
        this.addresssHandleChange = this.addresssHandleChange.bind(this);
        this.amountHandleChange = this.amountHandleChange.bind(this);
    }
    addresssHandleChange(e) {
        this.setState({ address: e.target.value });
    }
    amountHandleChange(e) {
        this.setState({ amount: e.target.value });
    }
    async loadTransactions() {
        const author = (this.props.userprofile) ? this.props.userprofile.address : this.props.auth.address
        const query = `api/transactions/author=${author}/type=payment/page=${this.state.page}`
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
        var payments = [];
        await asyncForEach(txlist, async (tx) => {
            const txdecoded = decode(Buffer.from(tx.data.data))
            const payment = {
                address: txdecoded.params.address,
                time: tx.createdAt,
                amount: txdecoded.params.amount,
            }
            payments.push(payment);
        });
        this.setState({ payments: this.state.payments.concat(payments), page: this.state.page + 1 });
    }

    handlePayment() {
        if (this.state.isSend) {
            console.log(this.state.address);
            const params = {
                address: this.state.address,
                amount: Number(this.state.amount),
            };
            this.props.dispatch(broadcastTx({ params, operation: "payment" }));
        }
    }
    handleCreate() {
        if (this.state.isCreate) {
            console.log(this.state.address);
            const params = {
                address: this.state.address,
            };
            this.props.dispatch(broadcastTx({ params, operation: "create_account" }));
        }
    }
    render() {
        const user = (this.props.userprofile) ? this.props.userprofile : this.props.auth;
        const loader = <div className="fluid-centered" key={0}>Loading...</div>;
        return <div className="mid wallet">
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadTransactions.bind(this)}
                hasMore={this.state.hasMore}
                threshold={50}
                useWindow={false}
                loader={loader}>

                <div className="balance">
                    <p className="title">BALANCE</p>
                    <h3>{user.balance.format()} CEL</h3>
                    <div
                        style={(this.state.isSend || this.state.isCreate) ? {} : { display: `none` }}>
                        <div className="clear-fix"></div>
                        <p className="title">
                            {(this.state.isCreate) ? ("CREATE ACCOUNT") :
                                (this.state.isSend) ? ("TRANSFER") : (null)

                            }</p>
                        <div className="address">
                            <input
                                placeholder="Account address (Public key)"
                                type="text"
                                aria-label="address"
                                onChange={this.addresssHandleChange}
                                value={this.state.address}
                            />
                        </div>
                        <div className="amount"
                            style={this.state.isCreate ? { display: `none` } : {}}
                        >
                            <input
                                placeholder="Amount"
                                type="number"
                                aria-label="amount"
                                onChange={this.amountHandleChange}
                                value={this.state.amount}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="cancel"
                            style={(this.state.isSend || this.state.isCreate) ? {} : { display: `none` }}
                            onClick={() => this.setState({ isSend: false, isCreate: false })}>
                            CANCEL</div>
                        <div className="send"
                            style={this.state.isCreate ? { display: `none` } : {}}
                            onClick={() => {
                                this.handlePayment();
                                this.setState({ isSend: true });
                            }}>SEND</div>
                        <div className="send"
                            style={this.state.isSend ? { display: `none` } : {}}
                            onClick={() => {
                                this.handleCreate();
                                this.setState({ isCreate: true });
                            }}>CREATE ACCOUNT</div>
                    </div>
                </div>
                <div className="transactions">
                    <p className="title">LAST TRANSACTIONS</p>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>DATE AND TIME</th>
                                    <th></th>
                                    <th>ADDRESS</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.payments.map((payment, index) => {
                                    return <tr className="item" key={index}>
                                        <td>{new Date(payment.time).toLocaleDateString() + '\n' + new Date(payment.time).toLocaleTimeString()}</td>
                                        <td>to</td>
                                        <td><a>{payment.address}</a></td>
                                        <td>{payment.amount} CEL</td>
                                    </tr>
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </InfiniteScroll>
        </div >
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
        userprofile: state.userprofile,
    }
};

export default connect(
    mapStateToProps,
)(Wallet);