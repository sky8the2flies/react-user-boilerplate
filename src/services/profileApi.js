import tokenService from './tokenService';

export default {
    getProfile,
    getOtherProfile,
    updateProfile,
};

const BASE_URL = '/api/users/profile';

function getProfile(user) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: tokenService.getAuthMethods(),
        body: JSON.stringify(user),
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('Something went wrong: 404 Profile not found');
        })
        .then((profile) => profile);
}

function getOtherProfile(user, profileId) {
    return fetch(`${BASE_URL}/${profileId}`, {
        method: 'POST',
        headers: tokenService.getAuthMethods(),
        body: JSON.stringify(user),
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('Something went wrong: 404 Profile not found');
        })
        .then((profile) => profile);
}

function updateProfile(profileId) {
    return fetch(`${BASE_URL}/${profileId}`, {
        method: 'PUT',
        headers: tokenService.getAuthMethods(),
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error('Something went wrong: 404 Profile not found');
        })
        .then((profile) => profile);
}
