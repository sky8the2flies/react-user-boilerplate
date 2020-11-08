import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './SignupPage.css';

import userService from '../../services/userService';

import Error from '../../modals/Error/Error';

const SignupPage = (props) => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
    });
    const [err, setError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.signup(form);
            props.handleLoadUser();
            props.history.push('/');
        } catch (err) {
            setError(true);
        }
    };
    return (
        <div className="SignupPage-container">
            <div className="SignupPage-side">
                <img
                    src="https://images.unsplash.com/photo-1604668257016-55b2b5f828e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80"
                    alt="imgBox"
                />
            </div>
            <div className="SignupPage-content-container">
                <div className="SignupPage-form-container">
                    {err ? (
                        <Error
                            floating={false}
                            bgColor={'white'}
                            color={'red'}
                            closeErr={() => setError(false)}
                        >
                            <h1>Email already exists</h1>
                        </Error>
                    ) : (
                        <></>
                    )}
                    <h2>Sign up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="SignupPage-input-box">
                            <span>Username</span>
                            <input
                                type="text"
                                value={form.username}
                                name="username"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="SignupPage-input-box">
                            <span>Email</span>
                            <input
                                type="email"
                                value={form.email}
                                name="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="SignupPage-input-box">
                            <span>Password</span>
                            <input
                                type="password"
                                value={form.password}
                                name="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="SignupPage-input-box">
                            <span>Confirm Password</span>
                            <input
                                type="password"
                                value={form.passwordConf}
                                name="passwordConf"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="SignupPage-input-box">
                            <input type="submit" value="Sign Up" />
                        </div>
                    </form>
                    <div className="sep">OR</div>
                    <div className="SignupPage-social-container">
                        <Link
                            className="SignupPage-link-btn"
                            to="/accounts/signup"
                        >
                            Sign Up with Google
                        </Link>
                    </div>
                    <div className="SignupPage-input-box">
                        <p>
                            Already have an account?{' '}
                            <Link
                                className="SignupPage-link"
                                to="/accounts/login"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
