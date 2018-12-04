import React, { Component } from 'react';
import Search from '../Components/Search';
import UserList from '../Components/UserList';
export default function HomeSidebar(props) {
    return <div className="homesidebar">
        <Search />
        <div className="clear-fix"></div>
        <UserList />
    </div>
}