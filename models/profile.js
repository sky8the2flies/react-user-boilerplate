const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        profilePic: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Profile', profileSchema);
