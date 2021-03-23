import React from 'react';
import { Switch, Link, Route, useHistory } from 'react-router-dom';
import CredentialsForm from '../CredentialsForm/CredentialsForm';
import { CloseOutlined } from '@ant-design/icons';

import './UnauthenticatedApp.css';

var requestController = require("../../api/requestController");

function UnauthenticatedApp(props) {
    const setLoggedInUserId = props.setLoggedInUserId;

    return (
        <div className="UnauthenticatedApp">
            <Switch>
                <Route path="/NoLogin">
                    <NoLoginPage />
                </Route>
                <Route
                    path="/Login" render={(props) =>
                        <LoginPage {...props}
                            setLoggedInUserId={setLoggedInUserId} />
                    }
                />
                <Route
                    path="/Register"
                    render={(props) =>
                        <RegistrationPage {...props}
                            setLoggedInUserId={setLoggedInUserId}
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

// not implemented yet
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
            props.setLoggedInUserId(currUser.userId);
            history.push("/");
        }

    }

    return (
        <div className="LoginPage AuthenticationContainer">
            <CloseButtonContainer />
            <div className="FormContainer">
                <h4>Login</h4>
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
        props.setLoggedInUserId(user.userId);
        history.push("/");
    }

    return (
        <div className="RegistrationPage AuthenticationContainer">
            <CloseButtonContainer />
            <div className="FormContainer">
                <h4>Registration</h4>
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