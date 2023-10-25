const mongoose = require('mongoose');

var driverMongooseSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        required: 'This field is required.'
    },
    lastName: {
        type: String,
        required: 'This field is required.'
    },
    middleName: {
        type: String,
        required: false
    },
    twicExpiration: {
        type: String,
        required: 'This field is required.'
    },
    phoneNubmer: {
        type: String
    },
    email: {
        type: String
    },
    carrier: {
        type: String,
        required: 'This field is required.'
    },
    product: {
        type: String,
        required: 'This field is required.'
    },
});

//Need custom validation for email
driverMongooseSchema.path('email').validate((val) => {
    emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(val);
}, 'Invalid email.');

mongoose.model('drivercollection', driverMongooseSchema);