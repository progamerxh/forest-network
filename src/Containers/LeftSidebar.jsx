import React, { Component } from 'react';
import Search from '../Components/Search';
import UserList from './UserList';

export default function LeftSideBar(props) {
    return <div className="homesidebar">
        <Search role="mini"/>
        <div className="clear-fix"></div>
        <UserList />
    </div>
}