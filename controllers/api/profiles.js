const Profile = require('../../models/profile');

module.exports = {
    getProfile,
    getOtherProfile,
    updateProfile,
};

async function getProfile(req, res) {
    const user = req.body;
    try {
        const profile = await Profile.findOne({ user: user._id });
        return res.status(200).json(profile);
    } catch (err) {
        return res.status(400).json({ err: 'Profile not found.' });
    }
}

async function getOtherProfile(req, res) {
    // const requestUser = req.user;
    try {
        const profile = await Profile.findById(req.params.id);
        return res.status(200).json(profile);
    } catch (err) {
        return res.status(400).json({ err: 'Profile not found.' });
    }
}

async function updateProfile(req, res) {
    try {
        const profile = await Profile.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        return res.status(201).json(profile);
    } catch (err) {
        return res.status(400).json({ err: 'Profile not found, not updated.' });
    }
}
