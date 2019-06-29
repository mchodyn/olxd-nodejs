const express = require('express');
const categories = require('../routes/categories');
const users = require('../routes/users');
const auths = require('../routes/auth');
const auctions = require('../routes/auctions');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/categories',categories);
    app.use('/api/users',users);
    app.use('/api/auths',auths);
    app.use('/api/auctions',auctions);
};