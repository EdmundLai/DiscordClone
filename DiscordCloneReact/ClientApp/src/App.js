import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';

import AuthenticatedApp from './components/AuthenticatedApp/AuthenticatedApp';

import UnauthenticatedApp from './components/UnauthenticatedApp/UnauthenticatedApp';

import Cookies from 'js-cookie';

import './App.css';
import './ModalStyling.css';


export default function App() {
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        const currUserId = Cookies.get('userId');
        console.log(currUserId);

        if (typeof currUserId !== "undefined") {
            setLoggedInUserId(currUserId);
        }

    }, []);

    //static displayName = App.name;
    Modal.setAppElement('#root');

    function login(userId) {
        setLoggedInUserId(userId);
        Cookies.set('userId', userId);
    }

    function logout() {
        setLoggedInUserId(null);
        Cookies.remove('userId');
    }

    const appContent = loggedInUserId !== null ? <AuthenticatedApp
        loggedInUserId={loggedInUserId}
        logout={logout}
    /> :
        <UnauthenticatedApp login={login} />

    return (
        <BrowserRouter>
            <div className="App">
                {appContent}
            </div>
        </BrowserRouter>
    );
}
