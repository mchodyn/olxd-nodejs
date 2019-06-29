const mongoose = require('mongoose');
const Joi = require('joi');
Joi.obejctId = require('joi-objectid')(Joi);
const {categorySchema} = require('../model/category');

const auctionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 255
    },
    category: {
        type: categorySchema,
        required: true
    },
    owner: {
        _id: String,
        name: String
    },
    buyNowPrice: {
        type: Number,
        required: true
    },
    offers: [{
        _id: String,
        name: String,
        offeredValue: Number
    }]
});
const Auction = mongoose.model('Auction', auctionSchema);

function validateAuction(auction) {
    const validationSchema = {
        title: Joi.string().min(10).max(255).required(),
        categoryId: Joi.obejctId().required(),
        buyNowPrice: Joi.number().min(0).required()
    };

    return Joi.validate(auction, validationSchema);

}
exports.Auction = Auction;
exports.validate = validateAuction;