import React, { Component } from 'react';
import '../Stylesheets/App.css';
import User from '../Components/User';
import Search from '../Components/Search';
import Navigation from '../Components/Navigation';
import NewsFeed from '../Components/NewsFeed';
import UserProfile from '../Components/UserProfile';
import LeftSidebar from './LeftSidebar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TransactionList from '../Components/TransactionList';
import TxDetail from '../Components/TxDetail';
import RightSideBar from './RighSideBar';
import Wallet from '../Components/Wallet';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <div className="left-panel">
                        <User />
                        <div className="clear-fix"></div>
                        <Switch>
                            <Route path='/profile/:address' component={UserProfile} />
                            <Route path='/' component={LeftSidebar} />
                        </Switch>
                    </div>
                    <div className="right-panel">
                        <div className="top">
                            <Navigation />
                            <Search />
                        </div>
                        <div className="main-section">
                            <Switch>
                            <Route path='/profile' component={NewsFeed} />
                            <Route path='/Home' component={NewsFeed} />
                            <Route path='/Forest' component={TransactionList} />
                            <Route path='/Search' component={TxDetail} />
                            <Route path='/Wallet' component={Wallet} />
                            </Switch>
                            <RightSideBar/>
                        </div>
                    </div>
                </div >
            </BrowserRouter>
        );
    }
}

export default App;
