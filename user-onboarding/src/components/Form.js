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
    width: 300px;
    background-color: lightgray;
    color: black;
    border-radius: 20px
    padding: 10px;
`
const UserContainer =styled.div`
    margin-top: 50px;
    width: 100%;
    background-color: black;
    padding: 20px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
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
                <label>Role</label>
                <Field as="select" name="role" className="inputForm">
                    <option>Please select your role</option>
                    <option value="Team Lead">Team Lead</option>
                    <option value="Minion">Minion</option>    
                </Field>
                {touched.role && errors.role && (
                    <Perror>{errors.role}</Perror>
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
            <UserContainer>
                {
                    users.map(user => (
                        <UserCard>
                        <h3>{user.usersname}</h3>
                        <p>Role: {user.role}</p>
                        <p>Email Address: {user.email}</p>
                        </UserCard>))
                }
            
            
            </UserContainer>
        </div>
    )
}

const FormikUserForm = withFormik({

    mapPropsToValues({usersname, email, role, password, tos}){
        return {
            usersname: usersname || "",
            role: role || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },

    //Form validation
    validationSchema: Yup.object().shape({
        usersname: Yup.string().required('* Please input your name'),
        role: Yup.string().required('* Plese select your role'),
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
