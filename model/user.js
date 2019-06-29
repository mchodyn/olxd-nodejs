const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose  =require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024
    },
    isPremium: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({_id: this._id, isPremium: this.isPremium},'1234');
};

const User = mongoose.model('User',userSchema);

function validateUser(user) {
    const validationSchema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, validationSchema);
}
exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
