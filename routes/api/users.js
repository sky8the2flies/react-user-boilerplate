const express = require('express');
const router = express.Router();

const usersCtrl = require('../../controllers/api/users');
const profileCtrl = require('../../controllers/api/profiles');

/* -- PUBLIC ROUTES --*/
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.post('/auth/google', usersCtrl.googleLogin);

router.post('/profile', profileCtrl.getProfile);
router.post('/profile/:id', profileCtrl.getOtherProfile);
router.put('/profile/:id', profileCtrl.updateProfile);

module.exports = router;
