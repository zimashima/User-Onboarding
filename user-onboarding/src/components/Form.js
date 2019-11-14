import React from "react"
import styled from "styled-components"
import {withFormik, Form, Field} from "formik"
import { __values } from "tslib"

const TheButton = styled.button`
    background-color: gray;
    color: white;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 10px;
`

function UserForm({values}) {
    return (
        <div>
            <Form>
                <Field type="text" name="usersname"/>
                <Field type="text" name="email"/>
                <Field type="text" name="password"/>
                <label>Terms of Service
                <Field type="checkbox" name="termsservice" checked={values.termsservice} />
                </label>
                <TheButton> Submit </TheButton>
            </Form>
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({usersname, email, password, termsservice}){
        return {
            usersname: usersname || "",
            email: email || "",
            password: password || "",
            termsservice: termsservice || false
        }
    }
})(UserForm)

export default FormikUserForm