﻿import React, { Component } from 'react';
import "./AddUser.css";
import { Redirect, Link } from "react-router-dom";
import axios from 'axios'
import KvsIcon from '../content/KVS-Icon.png';
import  CheckBox  from './CheckBox';


export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            loginParams: {
                user_id: "",
                user_password: ""
            },
            userFail: true,
            permissions: [
                { id: 0, value: "Admin", isChecked: false },
                { id: 1, value: "Cashier", isChecked: false },
                { id: 2, value: "Cook", isChecked: false }
            ]
        };
    }

    handleFormChange = event => {
        let loginParamsNew = { ...this.state.loginParams };
        let val = event.target.value;
        loginParamsNew[event.target.name] = val;
        this.setState({
            loginParams: loginParamsNew,
        });
    };

    login = event => {
        let user_id = this.state.loginParams.user_id;
        let user_password = this.state.loginParams.user_password;

        axios({
            method: 'post',
            url: '/api/user/adduser',
            data: {
                "username": user_id,
                "password": user_password,
                "permissionsarray": [
                    1,
                    2,
                    3
                ]
            },
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response.data)
            console.log(this.state.userFail)
            if (response.data == 1) {
                this.setState({
                    userFail: false
                });
            }
        }).catch((error) => {
        })

        event.preventDefault();
    };

    componentDidMount() {
        document.title = "Add User";
    }

    handleCheckChieldElement = (event) => {
        let permissions = this.state.permissions
        permissions.forEach(permission => {
            if (permission.value === event.target.value)
                permission.isChecked = event.target.checked
        })
        this.setState({ permissions: permissions })
    }



    render() {
        if (this.state.userFail == false) {
            return <Redirect to="/admin" />;
        }

        return (
            <div className="Login">
                <div className="LoginContainer">
                    <form onSubmit={this.login} className="form-signin">
                        <img src={KvsIcon} height="80px" class="center" />
                        <h1 className="signIn">Add User </h1>
                        <div className="row">
                            <div className="col">
                                <h3 className="h3 text-left"> Username: </h3>
                                <input
                                    type="text"
                                    name="user_id"
                                    onChange={this.handleFormChange}
                                    placeholder="Create Username"
                                />
                                <h3 className="h3 text-left"> Password: </h3>
                                <input
                                    type="password"
                                    name="user_password"
                                    onChange={this.handleFormChange}
                                    placeholder="Create Password"
                                />
                                <p className= "permissionText"> Permissions: </p>
                                <ul className = "checkBox">
                                {
                                    this.state.permissions.map((permission) => {
                                        return (<CheckBox handleCheckChieldElement={this.handleCheckChieldElement}  {...permission} />)
                                    })
                                }
                                </ul>

                                <Link to="/admin">
                                    <button className="cancelButton"> Cancel </button>
                                </Link>

                                <input className="createButton" type="submit" value="Create" />
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        );
    }
}