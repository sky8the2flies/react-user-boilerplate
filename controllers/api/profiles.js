const Profile = require('../../models/profile');

module.exports = {
    getProfile,
    getOtherProfile,
    updateProfile,
};

async function getProfile(req, res) {
    const user = req.user;
    try {
        const profile = await Profile.find({ user: user._id });
        res.status(200).json(profile);
    } catch (err) {
        res.status(400).json({ err: 'Profile not found.' });
    }
}

async function getOtherProfile(req, res) {
    const requestUser = req.user;
    try {
        const profile = await Profile.findById(req.params.id);
        res.status(200).json(profile);
    } catch (err) {
        res.status(400).json({ err: 'Profile not found.' });
    }
}

async function updateProfile(req, res) {
    try {
        const profile = await Profile.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.status(204).json(profile);
    } catch (err) {
        res.status(400).json({ err: 'Profile not found, not updated.' });
    }
}
