const User = require('../../models/user');
const Profile = require('../../models/profile');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const DEFAULT_PERMISSIONS = ['password_update', 'username_update', 'profile_*'];

module.exports = {
    signup,
    login,
    googleLogin,
};

async function signup(req, res) {
    const user = new User(req.body);
    user.permissions = DEFAULT_PERMISSIONS;
    try {
        await user.save();
        const newProfile = { user: user._id };
        await Profile.create(newProfile);
        const token = createJWT(user);
        return res.status(201).json({ token });
    } catch (err) {
        return res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ err: 'Unknown Email' });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
                const token = createJWT(user);
                return res.status(200).json({ token });
            } else {
                return res.status(401).json({ err: 'Wrong password' });
            }
        });
    } catch (err) {
        return res.status(400).json(err);
    }
}

/*-- SOCIAL LOGIN --*/
async function googleLogin(req, res) {
    console.log(req.body);
    try {
        let user = await User.findOne({ googleId: req.body.googleId });
        if (!user) {
            const newUser = {
                username: req.body.profileObj.name,
                email: req.body.profileObj.email,
                googleId: req.body.googleId,
                password: process.env.DEFAULT_PASSWORD,
            };
            user = new User(newUser);
            await user.save();
            const newProfile = { user: user._id };
            await Profile.create(newProfile);
        }
        const token = createJWT(user);
        return res.status(200).json(token);
    } catch (err) {
        return res.staus(400).json(err);
    }
}

/*-- HELPER FUNCTIONS --*/

function createJWT(user) {
    return jwt.sign({ user }, JWT_SECRET, { expiresIn: '24h' });
}
