import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { navigate } from '../Actions/NavAction'
import { exploreuser } from '../Actions/UserAction';
import { refreshposts } from '../Actions/PostAction';

function Navigation(props) {
    const navigations = ["Profile", "Home", "Forest","Wallet"];
    return <div className="navigate">
        <ul className="navitems">
            {navigations.map((navigation, index) => {
                var user = null;
                var linkto = navigation;
                if (navigation === "Profile") {
                    user = props.auth;
                    linkto = `profile/${props.auth.address}`;
                }
                return (
                    <li key={index}>
                        <Link className={(props.navigate === navigation) ? "active" : ""}
                            to={'/' + linkto}
                            title={navigation}
                            onClick={() => {
                                props.dispatch(navigate(navigation));
                                props.dispatch(refreshposts());
                                props.dispatch(exploreuser(user));
                            }}
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
        auth: state.auth,
    }
};

export default connect(
    mapStateToProps,
)(Navigation);