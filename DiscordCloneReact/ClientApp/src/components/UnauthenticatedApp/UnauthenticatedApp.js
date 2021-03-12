import React, { useEffect, useState } from 'react';

import { Switch, Link, Route } from 'react-router-dom';

import './UnauthenticatedApp.css';

import CredentialsForm from '../CredentialsForm/CredentialsForm';

var requestController = require("../../api/requestController");

function UnauthenticatedApp(props) {
    return (
        <div className="UnauthenticatedApp">
            <Switch>
                <Route path="/NoLogin">
                    <NoLoginPage />
                </Route>
                <Route path="/Login">
                    <LoginPage />
                </Route>
                <Route path="/Register">
                    <RegistrationPage />
                </Route>
                <Route path="/">
                    <WelcomePage />
                </Route>
            </Switch>
        </div>
    );
}

function WelcomePage(props) {
    return (
        <div className="WelcomePage AuthenticationContainer">
            <h2 className="AuthenticationContainerHeading">Welcome to DiscordClone!</h2>
            <div className="AuthenticationMenu">
                <div className="AuthenticationMenuOption">
                    <h5>No account</h5>
                    <Link to="/NoLogin">
                        <button>Proceed</button>
                    </Link>
                </div>
                <div className="AuthenticationMenuOption">
                    <h5>Use an account</h5>
                    <Link to="/Login">
                        <button>Log in</button>
                    </Link>
                     or
                    <Link to="/Register">
                        <button>Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function NoLoginPage() {
    return (
        <div className="NoLoginPage AuthenticationContainer">
            Here is my page for continuing without an account!
            <Link to="/">
                <button>Back</button>
            </Link>
        </div>
    );
}

function LoginPage() {

    function handleCredentials(userName, password) {
        console.log("Login Handler");
        console.log(`username: ${userName}`);
        console.log(`password: ${password}`);
    }

    return (
        <div className="LoginPage AuthenticationContainer">
            <h4>Login</h4>
            <CredentialsForm
                handleCredentials={handleCredentials}
                submitButtonText="Login"
            />
        </div>
    );
}

function RegistrationPage(props) {
    function handleCredentials(userName, password) {
        console.log("Registration Handler");
        console.log(`username: ${userName}`);
        console.log(`password: ${password}`);
    }

    return (
        <div className="RegistrationPage AuthenticationContainer">
            <h4>Registration</h4>
            <CredentialsForm
                handleCredentials={handleCredentials}
                submitButtonText="Register"
            />
        </div>
    );
}

export default UnauthenticatedApp;