import React from "react";
import styled from "styled-components";
import {withFormik, Form, Field} from "formik";
import * as Yup from 'yup';

const TheButton = styled.button`
    background-color: gray;
    color: white;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 10px;
    font-size: 20px;
`

const FormDiv = styled.div`
    background-color: #696969;
    color: white;
    width: 500px;
    margin: 0 auto;
    border-radius: 30px;
    font-size: 16px;
`
const Perror = styled.p`
    font-weight: bold;
`
function UserForm({values, touched, errors}) {
    return (
        <FormDiv>
            <Form className="mainForm">
                <label>Name</label>
                <Field type="text" name="usersname" className="inputForm"/>
                {touched.usersname && errors.usersname && (
                    <Perror>{errors.usersname}</Perror>
                )}
                <label>Email Address</label>
                <Field type="text" name="email"className="inputForm"/>
                {touched.email && errors.email && (
                    <Perror>{errors.email}</Perror>
                )}
                <label>Password</label>
                <Field type="password" name="password" className="inputForm"/>
                {touched.password && errors.password && (
                    <Perror>{errors.password}</Perror>
                )}
                <label>Terms of Service
                <Field type="checkbox" name="termsservice" checked={values.termsservice} />
                </label>
                <TheButton> Submit </TheButton>
            </Form>
        </FormDiv>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({usersname, email, password, termsservice}){
        return {
            usersname: usersname || "",
            email: email || "",
            password: password || "",
            termsservice: termsservice || false
        };
    },

    validationSchema: Yup.object().shape({
        usersname: Yup.string().required('* Please input your name'),
        email: Yup.string().email('* Email not valid').required('* Email is required'),
        password: Yup.string().min(8, '* Password must be 8 characters or longer').required('* Password is required')
    })
})(UserForm)

export default FormikUserForm