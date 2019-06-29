const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {User} = require('../model/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const validationSchema = {
        email: Joi.string().min(5).max(100).email(),
        password: Joi.string().min(5).max(255)
    };

    return Joi.validate(req,validationSchema);

}
module.exports = router;