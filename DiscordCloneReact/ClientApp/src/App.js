import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';

//import { Layout } from './components/Layout';
//import { Home } from './components/Home';
//import Chat from './components/Chat';
//import TestComponent from './components/TestComponent';

import AuthenticatedApp from './components/AuthenticatedApp/AuthenticatedApp';

import UnauthenticatedApp from './components/UnauthenticatedApp/UnauthenticatedApp';

import './App.css'


export default function App() {
    const [authenticated, setAuthenticated] = useState(false);

    function toggleAuthentication() {
        setAuthenticated(!authenticated);
    }


    //static displayName = App.name;
    Modal.setAppElement('#root');

    const authenticatedLabel = authenticated ? "Authenticated" : "Unauthenticated";

    const appContent = authenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />

    return (
        <BrowserRouter>
            <div className="App">
                <div>
                    Toggle Authenticated
                <button onClick={toggleAuthentication}>{authenticatedLabel}</button>
                </div>
                {appContent}
            </div>
        </BrowserRouter>

    );
}
