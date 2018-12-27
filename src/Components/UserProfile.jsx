import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calculateBandwidth } from '../lib/Helper'
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
class UserProfile extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { balance, bandwidth, sequence, bandwidthTime } = this.props.userprofile ? this.props.userprofile : this.props.auth;
        const isAuthProfile = (!this.props.userprofile || this.props.userprofile.address === this.props.auth.address) ? true : false;
        return <div className="userprofile">
            <div className="userstat">
                <div className="balance">
                    <i className="fa fa-gg-circle" ></i>
                    <label>CEL</label>
                    <span>{balance.format()}</span>
                </div>
                <div className="bandwidth">
                    <i className="fa fa-battery-full" ></i>
                    <label>OXY</label>
                    <span>{calculateBandwidth(bandwidth, bandwidthTime, balance)}</span>
                    <div className="sequence">
                        <i className="fa fa-long-arrow-up" ></i>
                        <label>Sequence</label>
                        <span>{sequence}</span>
                    </div>
                </div>
            </div>
            <div className="clear-fix"></div>
            <div className="content">
                <div className="interaction"
                    style={!isAuthProfile ? { display: `none` } : {}}>
                    <div className="hover updateinfor">
                        <a >
                            <i className="fa fa-edit" ></i>
                            Update information
                    </a>
                    </div>
                </div>
                <p>{this.props.auth.infor}</p>
            </div>
        </div>
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
)(UserProfile);