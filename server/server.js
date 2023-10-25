require('./models/db');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const driverController = require('./controllers/driverController');
const bodyParser = require('body-parser');

var app = express();
//send the form data to the HTTP request body:
app.use(bodyParser.urlencoded({
    extended: true,
}));
//transform the request into json format:
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

const portNumber = 3000;
app.listen( portNumber, () => {
    console.log('Express server started on port ' + portNumber + '.');
});

app.use('/driver', driverController);