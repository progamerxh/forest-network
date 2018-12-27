import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import enStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { base64Img } from '../lib/Helper'
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

const formatter = buildFormatter(enStrings)
class TxDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var user = this.props.searchresult.user;
        if (user && user.picture) {
            user.avatar = base64Img(user.picture.data);
        }
        return <div className="mid">
            {(user) ? (
                <div className="user">
                    <img className="avt" src={user.avatar} ></img>
                    <div className="userstat">
                        <div className="balance">
                            <i className="fa fa-gg-circle" ></i>
                            <label>CEL</label>
                            <span>{user.balance.format()}</span>
                        </div>
                        <div className="bandwidth">
                            <div className="sequence">
                                <i className="fa fa-long-arrow-up" ></i>
                                <label>Sequence</label>
                                <span>{user.sequence}</span>
                            </div>
                        </div>
                    </div>
                </div>) : ("Nothing found!")
            }

        </div>
    }
}
const mapStateToProps = state => {
    return {
        searchresult: state.searchresult,
    }
};

export default connect(
    mapStateToProps,
)(TxDetail);