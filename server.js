// import express
const express = require('express');
// import mongoose
const mongoose = require('mongoose');
// use express
const app = express();

// set up default server port
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// use routes
app.use(require("./routes"));

// useFindAndModify, useNewUrlParser, useUnifiedTopology are deprecated in mongoose v6, as they are set to false, true, true, respectively by default
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/whispr')

// logs mongo queries
mongoose.set('debug', true);

// connect server
app.listen(PORT, () => console.log(`Server listening to port: ${PORT}`));