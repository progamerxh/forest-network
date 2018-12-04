import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { navigate } from '../Actions/NavAction'

function Navigation(props) {
    const navigations = ["Profile","Home","Forest"];
    return <div className="navigate">
        <ul className="navitems">
            {navigations.map((navigation, index) => {
                return (
                    <li key={index}>
                        <Link className={(props.navigate === navigation) ? "active" : ""}
                            to={'/' + navigation}
                            title={navigation}
                            onClick={() => {props.dispatch(navigate(navigation))}}
                            >
                        
                            {navigation}
                         </Link>
                    </li>
                )
            })}
        </ul>
    </div>
}

const mapStateToProps = state => {
    return {
        navigate: state.navigate,
    }
};

export default connect(
    mapStateToProps,
)(Navigation);