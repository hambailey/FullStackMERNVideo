const mongoose = require('mongoose')

var options = {
    autoIndex: false,
    serverSelectionTimeoutMS: 50000,
    maxPoolSize: 5, //default poolSize is 5
}
var userName = 'DriverRecordsWebsiteApplication';
var password = 'nf4ZGHSY0893261X';
var defaultDB = 'bwcdriverorientationrecordsdatabase';
var webAddress = 'db-mongodb-nyc3-81708-d674af5d.mongo.ondigitalocean.com';
var authentication = '?tls=true&authSource=admin&replicaSet=db-mongodb-nyc3-81708';
var collection1 = '/drivercollection';
var dbPort = 27017; // A connection string cannot have a port in it per mongodb.
var connectionString = 'mongodb+srv://DriverRecordsWebsiteApplication:<replace-with-your-password>@db-mongodb-nyc3-81708-d674af5d.mongo.ondigitalocean.com/BWCDriverOrientationRecordsDatabase?tls=true&authSource=admin&replicaSet=db-mongodb-nyc3-81708';
var driverRecordsURI = 'mongodb+srv://' + userName + ':' + password + '@' + webAddress + '/' + defaultDB + authentication;

mongoose.connect(driverRecordsURI, options)
    .then(() => {
        console.log('Connected to MongoDB as ' + userName + ' on database: ' + defaultDB);
    })
    .catch((err) => {
        console.log(err);
    });

require('./driver.model');

