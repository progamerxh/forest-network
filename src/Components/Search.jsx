import React, { Component } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { searchuser, minisearch } from '../Actions/SearchAction';
import { withRouter } from "react-router-dom";
import { decode, hash } from '../lib/tx/index'
import vstruct from 'varstruct'
import base32 from 'base32.js'
import { PlainTextContent, ReactContent } from '../lib/tx/v1';

const serverurl = "http://localhost:3010/";


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
        this.textHandleChange = this.textHandleChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    textHandleChange(e) {
        if (e.target.value === '' && this.props.role === "mini")
            this.props.dispatch(minisearch(this.state.text));
        this.setState({ text: e.target.value });
    }
    componentWillUnmount() {
        this.props.dispatch(minisearch(''));
    }
    submitHandler(e) {
        e.preventDefault();
        this.search();
    }

    search() {
        if (this.props.role === "mini")
            this.props.dispatch(minisearch(this.state.text));
        else {
            var index = null;
            index = 0;
            var arr = ["abcd"];
            console.log(arr);
            if (index !== null)
            arr.splice(0, 1);
            console.log(arr);
            arr.push("cd");
            console.log(arr);
        }

    }

    render() {
        return <div className="search">
            <form onSubmit={this.submitHandler}>
                <input
                    className="searchtext"
                    type="text"
                    aria-label="Search"
                    onChange={this.textHandleChange}
                    value={this.state.text}
                />
                <i id="searchicon" className="prefix mdi-action-search"
                    onClick={() => { this.search() }} />
            </form>
        </div>
    }
}
const mapStateToProps = state => {
    return {

    }
};

export default withRouter(connect(
    mapStateToProps,
)(Search));