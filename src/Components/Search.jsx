import React, { Component } from 'react';

export default function Search(props) {
    return <div className="search">
        <form >
            <input
                className="searchtext"
                type="text"
                aria-label="Search"
            />
            <i id="searchicon" className="prefix mdi-action-search" />
        </form>
    </div>
}