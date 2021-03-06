const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema(
    {
        username: { type: String, require: true },
        email: { type: String, required: true, lowercase: true, unique: true },
        permissions: [{ type: String }],
        password: String,
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', function (next) {
    const user = this;
    // if (user.isModified('username')) {

    // }
    if (user.isModified('password')) {
        bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    }
    return next();
});

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});

userSchema.methods.comparePassword = function (tryPassword, cb) {
    bcrypt.compare(tryPassword, this.password, cb);
};

module.exports = mongoose.model('User', userSchema);
