const express = require('express');
const router = express.Router();
const {validate, Auction} = require('../model/auction');
const {Category} = require('../model/category');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
    const auctions = await Auction.find();
    res.send(auctions);
});

router.post('/',auth ,async (req,res) => {
    const {error} = validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if(!category) return res.status(400).send('wrong category');

    let auction = new Auction({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        owner: {
            _id: req.user._id,
            name: req.user.name
        },
        buyNowPrice: req.body.buyNowPrice,
        offers: []
    });
     const ac = await auction.save();
    res.send(ac);
});
module.exports = router;
