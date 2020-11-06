import tokenService from './tokenService';

export default {
    getUser,
    signup,
    login,
    logout,
};

const BASE_URL = '/api/users';

function getUser() {
    return tokenService.getUserFromToken();
}

async function signup(user) {
    const res = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(user),
    });
    if (res.ok) return res.json();
    throw new Error('Email already taken!');
}

async function login(creds) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(creds),
    });
    if (res.ok) return res.json();
    throw new Error('Bad credentials');
}

function logout() {
    tokenService.removeToken();
}
