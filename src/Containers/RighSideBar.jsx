import React, { Component } from 'react';
import TrendingTag from '../Components/TrendingTags';
import {  Route, Switch } from 'react-router-dom'
import UserFollow from '../Components/UserFollow';
import Notification from '../Components/Notification';

export default function RightSideBar(props) {
    return <Switch>
        <Route path='/profile/:address'  component={UserFollow} />
        <Route path='/' component={Notification} />
    </Switch>

}