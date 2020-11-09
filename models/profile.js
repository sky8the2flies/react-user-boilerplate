const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            default: 'https://i.imgur.com/dOAIeiR.png',
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Profile', profileSchema);
