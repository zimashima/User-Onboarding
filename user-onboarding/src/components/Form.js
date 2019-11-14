import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {withFormik, Form, Field} from "formik";
import * as Yup from 'yup';

import axios from 'axios';

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
const UserCard = styled.div`
    background-color: yellow;
    color: black;
`
function UserForm({values, touched, errors, isSubmitting, status}) {

    const [users, setUsers] = useState([]);

    useEffect(()=> {
        status && setUsers(users => [...users, status])
    }, [status])

    return (
        <div>
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
                <Field type="checkbox" name="tos" checked={values.tos} />
                </label>
                <TheButton disaled={isSubmitting}>
                    {
                        isSubmitting ? 'Submitting' : 'Submit'
                    }
                </TheButton>
            </Form>
        </FormDiv>
            <div>
                <h2>Current Users</h2>
                {
                    users.map(user => (
                        <UserCard>
                        <p>Name: {user.usersname}</p>
                        <p>Email Address: {user.email}</p>
                        </UserCard>))
                }
            
            
            </div>
        </div>
    )
}

const FormikUserForm = withFormik({

    mapPropsToValues({usersname, email, password, tos}){
        return {
            usersname: usersname || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },

    //Form validation
    validationSchema: Yup.object().shape({
        usersname: Yup.string().required('* Please input your name'),
        email: Yup.string().email('* Email not valid').required('* Email is required'),
        password: Yup.string().min(8, '* Password must be 8 characters or longer').required('* Password is required'),
    }),

    //Form submission

    handleSubmit(values, {resetForm, setSubmitting, setStatus}){
        axios
            .post("https://reqres.in/api/users",values)
            .then(res =>{
                resetForm();
                console.log(res)
                setStatus(res.data);

            })
            .catch(err => {
                console.log("CODE RED, err");
            }) 
            .finally(()=>{
                setSubmitting(false)
            })
    }
})(UserForm)

export default FormikUserForm
