import React from 'react';
import { Switch, Link, Route, useHistory } from 'react-router-dom';
import CredentialsForm from '../CredentialsForm/CredentialsForm';
import { CloseOutlined } from '@ant-design/icons';

import { Button } from 'antd';

import './UnauthenticatedApp.css';


import requestController from '../../api/requestController';

function UnauthenticatedApp(props) {
    const login = props.login;

    return (
        <div className="UnauthenticatedApp">
            <Switch>
                <Route
                    path="/Login" render={(props) =>
                        <LoginPage {...props}
                            login={login} />
                    }
                />
                <Route
                    path="/Register"
                    render={(props) =>
                        <RegistrationPage {...props}
                            login={login}
                        />
                    }
                />
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
                <Link to="/Login">
                    <Button>Log in</Button>
                </Link>
                <Link to="/Register">
                    <Button>Register</Button>
                </Link>
            </div>
        </div>
    );
}

function LoginPage(props) {
    let history = useHistory();

    async function handleCredentials(userName, password) {
        console.log("Login Handler");
        //console.log(`username: ${userName}`);
        //console.log(`password: ${password}`);

        const userVerified = await requestController.verifyUser(userName, password);
        console.log(userVerified);
        if (userVerified) {
            const currUser = await requestController.getUserByUserName(userName);
            console.log(currUser);
            props.login(currUser.userId);
            history.push("/");
        }

    }

    return (
        <div className="LoginPage AuthenticationContainer">
            <CloseButtonContainer />
            <div className="FormContainer">
                <h4 className="FormContainerHeader">Login</h4>
                <CredentialsForm
                    handleCredentials={handleCredentials}
                    submitButtonText="Login"
                    registerUser={false}
                />
            </div>
        </div>

    );
}

function RegistrationPage(props) {
    let history = useHistory();

    async function handleCredentials(userName, password) {
        console.log("Registration Handler");
        //console.log(`username: ${userName}`);
        //console.log(`password: ${password}`);

        await requestController.addUser(userName, password);

        const user = await requestController.getUserByUserName(userName);
        console.log(user);
        props.login(user.userId);
        history.push("/");
    }

    return (
        <div className="RegistrationPage AuthenticationContainer">
            <CloseButtonContainer />
            <div className="FormContainer">
                <h4 className="FormContainerHeader">Registration</h4>
                <CredentialsForm
                    handleCredentials={handleCredentials}
                    registerUser={true}
                    submitButtonText="Register"
                />
            </div>

        </div>
    );
}

function CloseButtonContainer() {
    return (
        <div className="CloseButtonContainer">
            <Link className="CloseButtonLink" to="/">
                <CloseOutlined />
            </Link>
        </div>
    );
}

export default UnauthenticatedApp;