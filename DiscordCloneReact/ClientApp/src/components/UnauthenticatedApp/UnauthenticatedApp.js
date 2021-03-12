import React, { useEffect, useState } from 'react';
import { useFormik } from "formik";

import { Switch, Link, Route } from 'react-router-dom';

import './UnauthenticatedApp.css';

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
                    <AuthenticationContainer />
                </Route>
            </Switch>
        </div>
    );
}

function AuthenticationContainer(props) {
    return (
        <div className="AuthenticationContainer">
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
        <div className="NoLoginPage">
            Here is my page for continuing without an account!
            <Link to="/">
                <button>Back</button>
            </Link>
        </div>
    );
}

function LoginPage() {
    return (
        <div className="LoginPage">
            Here is my login page!
            <Link to="/">
                <button>Back</button>
            </Link>
        </div>
    );
}

function RegistrationPage() {
    return (
        <div className="RegistrationPage">
            Here is my registration page!
            <Link to="/">
                <button>Back</button>
            </Link>
        </div>
    );
}

export default UnauthenticatedApp;