import React, { Component } from 'react';
import { connect } from 'react-redux';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return <div className="right">
            <div className="trendingtag">
                Notification
        </div>
            <div className="notifications">
                <ul className="notilist">
                    {/* {taglist.map((tag, index) => {
                        return <li className="item" key={index}>
                            <div className="tagtext">{tag}</div>
                            <div className="count"> {count[index]}</div>
                        </li>
                    })} */}

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
)(Notification);