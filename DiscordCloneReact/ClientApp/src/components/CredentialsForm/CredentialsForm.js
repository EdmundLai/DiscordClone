import React from 'react';
import { useFormik } from "formik";

import { Link } from 'react-router-dom';


function CredentialsForm(props) {
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        onSubmit: async (values) => {
            props.handleCredentials(values.userName, values.password);
        }
    });

    return (
        <form className="CredentialsForm" onSubmit={formik.handleSubmit}>
            <div>
                <label>Username: </label>
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                    required
                />
            </div>
            <div>
                <label>Password: </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required
                />
            </div>
            <div>
                <Link to="/">
                    <button>Back</button>
                </Link>
                <button type="submit">{props.submitButtonText}</button>
            </div>
        </form>
    );
}

export default CredentialsForm;