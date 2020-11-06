import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import userService from '../../services/userService';

const SignupPage = (props) => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
    });

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
            //TODO THROW ERR
            console.log(err);
        }
    };

    function isFormInvalid() {
        return !(
            form.username &&
            form.email &&
            form.password === form.passwordConf
        );
    }

    return (
        <div className="container SignupPage-container">
            <h1>Sign up</h1>
            <form className="SignupPage-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    name="username"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    name="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    name="password"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={form.passwordConf}
                    name="passwordConf"
                    onChange={handleChange}
                />
                <button disabled={isFormInvalid()}>Sign Up</button>
                <Link className="btn reset-link" to="/">
                    Cancel
                </Link>
            </form>
            <div>
                <p>
                    Already have an account?{' '}
                    <Link to="/accounts/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
