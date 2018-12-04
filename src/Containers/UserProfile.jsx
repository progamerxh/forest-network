import React, { Component } from 'react';
import UserStat from '../Components/UserStat';
import UserInfor from '../Components/UserInfor';
export default function UserProfile(props) {
    return <div className="userprofile">
        <UserStat />
        <div className="clear-fix"></div>
        <UserInfor />
    </div>
}