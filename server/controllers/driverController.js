//need to create a route for this website

const express = require('express');
const mongoose = require('mongoose');
const driverModel = mongoose.model('drivercollection'); //'DriverModel' is the model we created in driver.model.js. I initially thought it was the name of the database collection I had to match it to. Confirmed by the build process: 'DriverModel' is only linked to 'driver.model.js'.
var router = express.Router();

router.get('/', (req, res) => {
    res.render("driver/addOrEdit", {
        viewTitle: "Record a driver."
    });
});

router.post('/', (req, res) => {
    insertRecord(req, res);
});

router.get('/list', (req, res) => {
    driverModel.find()
        .then((err, docs) => res.render("driver/list", {list: docs}))
        .catch(err => console.log('Error in retrieving driver list: ' + err));
    // driverModel.find((err,docs) => {
    //     if(!err) res.render("driver/list", {
    //         list: docs
    //     });
    //     else console.log('Error in retrieving driver list: ' + err);
    // });

});

function insertRecord(req, res){
    var driver = new driverModel();
    driver.firstName = req.body.firstName;
    driver.lastName = req.body.lastName;
    driver.middleName = req.body.middleName;
    driver.twicExpiration = req.body.twicExpiration;
    driver.phoneNumber = req.body.phoneNumber;
    driver.email = req.body.email;
    driver.carrier = req.body.carrier;
    driver.product = req.body.product;
    driver.save('driver/list')
        .then(displayObjectDuringSuccess(res, driver))
        .catch(err => {
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("driver/addOrEdit", {
                    viewTitle: "Record Driver",
                    driver: req.body,
                });
            } else {
                console.log('Error during record insertion ' + err);
            }
        });
    // driver.save((err,doc) => {  //callback as a parameter deprecated
    //     if(!err) res.redirect('driver/list');
    //     else console.log('Error during record insertion' + err);
    // });
}

function displayObjectDuringSuccess(res, driver) {
    res.redirect('driver/list');
    console.log("");
    console.log("--Driver Object--")
    console.log("First Name: " + driver.lastName);
    console.log("Last Name: " + driver.firstName);
    console.log("Middle Name: " + driver.middleName);
    console.log("TWIC Expiration: " + driver.twicExpiration);
    console.log("Phone Number: " + driver.phoneNumber);
    console.log("Email: " + driver.email);
    console.log("Carrier: " + driver.carrier);
    console.log("Product: " + driver.product);
}

function handleValidationError(err, body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case 'firstName':
                body['firstNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;