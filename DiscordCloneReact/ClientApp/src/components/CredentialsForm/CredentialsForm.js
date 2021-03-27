import React from 'react';
import { useFormik } from "formik";

import * as Yup from 'yup';

import { Input, Button } from 'antd';

var requestController = require("../../api/requestController");


function CredentialsForm(props) {
    var schema = null;

    async function validateUsername(userName) {
        const result = await requestController.checkUserNameTaken(userName);
        return !result;
    }

    if (!props.registerUser) {
        schema = Yup.object().shape({
            userName: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('Required')
        });
    } else {
        schema = Yup.object().shape({
            userName: Yup.string()
                .required('Required')
                .test("checkDuplicateUsername", "Username already exists",
                    async value => {
                        if (typeof value == "undefined") {
                            return false;
                        }
                        const result = await validateUsername(value);
                        //console.log(result);
                        return result;
                    })
                .min(2, 'Too Short!')
                .max(15, 'Too Long!')
            ,
            password: Yup.string()
                .min(5, 'Too Short!')
                .max(20, 'Too Long!')
                .required('Required')
        });
    }

    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        onSubmit: async (values) => {
            //console.log(values.userName);
            //console.log(values.password);
            await props.handleCredentials(values.userName, values.password);
        },
        validationSchema: schema
    });

    return (
        <form className="CredentialsForm" onSubmit={formik.handleSubmit}>
            <div>
                <label>Username: </label>
                <Input
                    id="userName"
                    name="userName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                />
                <div>{formik.errors.userName}</div>
            </div>
            <div>
                <label>Password: </label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <div>{formik.errors.password}</div>
            </div>

            <Button htmlType="submit" disabled={!formik.isValid}>{props.submitButtonText}</Button>

        </form>
    );
}

export default CredentialsForm;