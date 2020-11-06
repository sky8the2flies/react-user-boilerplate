import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './LoginPage.css';

import userService from '../../services/userService';

const LoginPage = (props) => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        err: null,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(form);
            props.handleLoadUser();
            props.history.push('/');
        } catch (err) {
            //TODO THROW ERR
            console.log(err);
        }
    };

    return (
        <div className="LoginPage-container">
            <div className="LoginPage-side">
                <img
                    src="https://images.unsplash.com/photo-1604668257016-55b2b5f828e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"
                    alt="imgBox"
                />
            </div>
            <div className="LoginPage-content-container">
                <div className="LoginPage-form-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="LoginPage-input-box">
                            <span>Email</span>
                            <input
                                type="email"
                                value={form.email}
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="LoginPage-input-box">
                            <span>Password</span>
                            <input
                                type="password"
                                value={form.password}
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="LoginPage-input-box">
                            <input type="submit" value="Log In" />
                        </div>
                    </form>
                    <div className="sep">OR</div>
                    <div className="LoginPage-social-container">
                        <Link
                            className="LoginPage-link-btn"
                            to="/accounts/login"
                        >
                            Log in with Google
                        </Link>
                    </div>
                    <div className="LoginPage-input-box">
                        <p>
                            Don't have an account?{' '}
                            <Link
                                className="LoginPage-link"
                                to="/accounts/signup"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
