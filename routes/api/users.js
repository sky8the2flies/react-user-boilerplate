const express = require('express');
const passport = require('passport');
const router = express.Router();

const usersCtrl = require('../../controllers/api/users');
const profileCtrl = require('../../controllers/api/profiles');

/* -- PUBLIC ROUTES --*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
    '/oauth2callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/',
    })
);

router.post('/profile', profileCtrl.getProfile);
router.post('/profile/:id', profileCtrl.getOtherProfile);
router.put('/profile/:id', profileCtrl.updateProfile);

module.exports = router;
