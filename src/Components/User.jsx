import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { navigate } from '../Actions/NavAction'
import { editName } from '../Actions/AuthAction'
import { connect } from 'react-redux';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edittext: '',
            isEdit: false,
        };
        this.editName = this.editName.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e) {
        this.setState({ edittext: e.target.value });
    }

    editName() {
        if (this.state.edittext.trim() !== "") {
            this.props.dispatch(editName(this.state.edittext));
            this.setState({ edittext: '', isEdit: false });
        }
    }

    render() {
        const auth = this.props.auth;
        return <div className="user">
            <Link to='/Profile'>
                <img className="avatar"
                    onClick={() => { this.props.dispatch(navigate("Profile")) }}
                    src={auth.avatarUrl}
                ></img>
            </Link>
            {(!this.state.isEdit) ? (
                <p className="name">{auth.displayName}
                    <i className="fa fa-edit"
                        onClick={() => { this.setState({ isEdit: true }) }} />
                </p>
            ) : (null)}


            {(this.state.isEdit) ? (
                <div className="edit">
                    <input
                        onChange={this.handleTextChange}
                        value={this.state.tagtext}
                        type="text"
                        placeholder={auth.displayName}
                    ></input>
                    <div className="interaction">
                        <div className="hover ok">
                            <a onClick={this.editName} >
                                <i className="fa fa-check" ></i>
                                OK
                            </a>
                        </div>
                        <div className="hover cancel">
                            <a onClick={() => { this.setState({ isEdit: false }) }} >
                                <i className="fa fa-times" ></i>
                                Cancel
                            </a>
                        </div>
                    </div>
                </div>
            ) : (null)}

        </div >
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth,
        navigate: state.navigate,
    }
};

export default connect(
    mapStateToProps,
)(User);