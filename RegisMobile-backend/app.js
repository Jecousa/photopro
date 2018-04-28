const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const albumRoutes = require ('./api/routes/albums');

mongoose.connect("mongodb://jake:123@cluster0-shard-00-00-0xw0d.mongodb.net:27017,cluster0-shard-00-01-0xw0d.mongodb.net:27017,cluster0-shard-00-02-0xw0d.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin", {
    auth: {
      user: 'jake',
      password: '123'
    }
  })
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));
  
  mongoose.Promise = global.Promise;

  app.use(morgan("dev"));
  app.use('/uploads', express.static('uploads'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
  
  app.use("/albums", albumRoutes);
  
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  
  module.exports = app;
  