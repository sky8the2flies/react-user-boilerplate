import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import './LoginPage.css';

import userService from '../../services/userService';

import Error from '../../modals/Error/Error';

const LoginPage = (props) => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [err, setError] = useState(false);

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
            setError(true);
        }
    };

    const responseGoogle = (response) => {
        console.log(response);
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
                    {err ? (
                        <Error
                            floating={false}
                            bgColor={'white'}
                            color={'red'}
                            closeErr={() => setError(false)}
                        >
                            <h1>Username or Password incorrect</h1>
                        </Error>
                    ) : (
                        <></>
                    )}
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
                        <GoogleLogin
                            className="LoginPage-link-btn"
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Log in with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
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
