const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authentication', {
    useNewUrlParser: true
})

const app = express();


// middlware
app.use(morgan('dev'));
app.use(bodyParser.json());
//routes
app.use('/users', require('./routes/users'))
//Start servever

const port = process.env.PORT || 4000;
app.listen(port);
console.log(`server listen at pprt ${port}`)