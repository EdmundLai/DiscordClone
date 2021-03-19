import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';

//import { Layout } from './components/Layout';
//import { Home } from './components/Home';
//import Chat from './components/Chat';
//import TestComponent from './components/TestComponent';

import AuthenticatedApp from './components/AuthenticatedApp/AuthenticatedApp';

import UnauthenticatedApp from './components/UnauthenticatedApp/UnauthenticatedApp';

import './App.css';
import './ModalStyling.css';


export default function App() {
    //const [authenticated, setAuthenticated] = useState(false);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    //static displayName = App.name;
    Modal.setAppElement('#root');

    function logout() {
        setLoggedInUserId(null);
    }

    //const authenticatedLabel = authenticated ? "Authenticated" : "Unauthenticated";

    const appContent = loggedInUserId !== null ? <AuthenticatedApp
        loggedInUserId={loggedInUserId}
        logout={logout}
    /> :
        <UnauthenticatedApp setLoggedInUserId={setLoggedInUserId} />

    return (
        <BrowserRouter>
            <div className="App">
                {appContent}
            </div>
        </BrowserRouter>

    );
}
