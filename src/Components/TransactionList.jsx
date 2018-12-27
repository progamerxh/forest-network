import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import enStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(enStrings)
class TransactionList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="mid">
            <div className="transactions">
                <ul className="transactionlist">
                    {this.props.transactionlist.map((transaction, index) => {
                        return <div key={index}>
                            <li className="item">
                                <div className="transaction">
                                    <div className="user">
                                        <div className="infor">
                                            <div className="account">{transaction.account}</div>
                                            <div className="timeuploaded">
                                                <i className="fa fa-clock-o" ></i>
                                                <TimeAgo date={transaction.timestamp} formatter={formatter} />
                                            </div>
                                            <div className="hash">
                                                {transaction.hash}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <span className="operation"> {transaction.operation}</span>
                                        <div className="params">
                                            <span className="address"></span>
                                            <span className="amount"></span>
                                            <span className="content"></span>
                                            <span className="name"></span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <div className="clear-fix"></div>
                        </div>
                    })
                    }
                </ul>
            </div >
        </div>
    }
}
const mapStateToProps = state => {
    return {
        transactionlist: state.transactionlist,
    }
};

export default connect(
    mapStateToProps,
)(TransactionList);