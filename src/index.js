import React from 'react';
import ReactDOM from 'react-dom';
import './Stylesheets/index.css';
import App from './Containers/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './Reducers/rootReducer';
import { Provider } from 'react-redux';
import SignIn from './Components/SignIn';
import requireAuth from './Components/requireAuth';


const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="Container">
                <Route path='/' component={SignIn} />
                <Route path='/' component={requireAuth(App)} />
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
