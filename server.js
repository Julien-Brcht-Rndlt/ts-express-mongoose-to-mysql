const express = require('express');
const app = express();

//init mongodb connection
const mongoose = require('mongoose');
// connection string: mongodb protocol + db server host + db name
mongoose
    .connect('mongodb://127.0.0.1:27017/wilderdb')
    .then(() => console.log('Connected to wildersdb database'))
    .catch((err) => console.log(`Error while connecting to database: ${err.message}`));

//common required middlewares declaration
app.use(express.json);
app.use(express.urlencoded);

//path '/wilders' routing  + controller
const wilderController = require('../controllers/wilderController');
app.use('/api/wilders', wilderController);

app.listen(8080, (err) => {
    if(err) {
        console.error('Error while launching the server port: 8080');
    } else {
        console.log('Server started on port 8080')
    }
});