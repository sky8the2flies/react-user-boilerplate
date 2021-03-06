import tokenService from './tokenService';

export default {
    getUser,
    signup,
    login,
    logout,
    googleLogin,
};

const BASE_URL = '/api/users';

function getUser() {
    return tokenService.getUserFromToken();
}

function signup(user) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(user),
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('Username or Email already taken!');
        })
        .then(({ token }) => {
            tokenService.setToken(token);
        });
}

function login(creds) {
    return fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(creds),
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('Invalid email or password!');
        })
        .then(({ token }) => tokenService.setToken(token));
}

function googleLogin(responseGoogle) {
    return fetch(`${BASE_URL}/auth/google`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(responseGoogle),
    })
        .then((res) => {
            console.log(res);
            if (res.ok) return res.json();
            throw new Error('Something went wrong!');
        })
        .then(({ token }) => tokenService.setToken(token));
}

function logout() {
    tokenService.removeToken();
}
