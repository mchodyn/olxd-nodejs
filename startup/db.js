const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/olxd')
        .then(() => console.log('connected'))
        .catch(err => console.error('could not connect to db',err))
};