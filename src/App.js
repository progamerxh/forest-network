import React, { Component } from 'react';
import './App.css';
import User from './Components/User';
import Search from './Components/Search';
import UserList from './Components/UserList';
import Navigation from './Components/Navigation';
import NewsFeed from './Components/NewsFeed';
import UserFollow from './Components/UserFollow';
import UserInfor from './Components/UserInfor';
import UploadForm from './Components/UploadForm';
import UserProfile from './Containers/UserProfile';
import HomeSidebar from './Containers/HomeSidebar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TrendingTag from './Components/TrendingTags';
import SignIn from './Components/SignIn';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <div className="left-panel">
                        <User />
                        <div className="clear-fix"></div>
                        <Switch>
                            <Route exact path='/profile' component={UserProfile} />
                            <Route path='/' component={HomeSidebar} />
                        </Switch>
                    </div>
                    <div className="right-panel">
                        <div className="top">
                            <Navigation />
                            <Search />
                        </div>
                        <div className="main-section">
                            <div className="mid">
                                <UploadForm />
                                <div className="clear-fix"></div>
                                <NewsFeed />
                            </div>
                            <Switch>
                                <Route exact path='/profile' component={UserFollow} />
                                <Route path='/' component={TrendingTag} />
                            </Switch>
                        </div>
                    </div>
                </div >
            </BrowserRouter>
        );
    }
}

export default App;
