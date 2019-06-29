const express = require('express');
const categories = require('../routes/categories');
const users = require('../routes/users');
const auths = require('../routes/auth');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/categories',categories);
    app.use('/api/users',users);
    app.use('/api/auths',auths);
};