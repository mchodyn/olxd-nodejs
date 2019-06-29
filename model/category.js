const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    }
});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(category) {
    const validationSchema = {
        name: Joi.string().min(3).max(100).required()
    };

    return Joi.validate(category, validationSchema);
}

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validate = validateCategory;
