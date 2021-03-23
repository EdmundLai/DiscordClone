import React, { useState } from 'react';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';

import AuthenticatedApp from './components/AuthenticatedApp/AuthenticatedApp';

import UnauthenticatedApp from './components/UnauthenticatedApp/UnauthenticatedApp';

import './App.css';
import './ModalStyling.css';


export default function App() {
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    //static displayName = App.name;
    Modal.setAppElement('#root');

    function logout() {
        setLoggedInUserId(null);
    }

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
