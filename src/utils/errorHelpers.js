const { MongooseError } = require('mongoose');

exports.extractErrorMessages = (error) => {
    if (error instanceof MongooseError) {
        return Object.values(error.errors).map(m => m.message);
    } else if (error) {
        return [error.message];
    }
};