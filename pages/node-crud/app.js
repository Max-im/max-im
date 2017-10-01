require('dotenv').config();

const express = require('express');
const port = process.env.PORT || 8080;
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');




const app = express();



// config
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.json());

// routes
app.use(require('./app/routes'));


// server
app.listen(port);
