// modules =================================================
//https://www.tutorialspoint.com/meanjs/meanjs_project_setup.htm
//MEAN.js refers to full stack JavaScript framework, used for building dynamic websites and web applications. 
//MEAN is an acronym that stands for MongoDB, Express, Node.js and Angular,
//SAP Hybris
//Stack means using the database and web server in the back end, 
//in the middle you will have logic and control for the application and
// interaction of user at the front end.
//https://www.mongodb.com/languages/mean-stack-tutorial
//MongoDB − Database System

//Express − Back-end Web Framework (Web Server)
//Express—a Node.js framework for building APIs

//Node.js − Web Server Platform
//Node.js—server-side JavaScript runtime environment

//Angular − Front-end Framework

//Node.js is a back-end JavaScript runtime environment, runs on the V8 JavaScript Engine, and executes JavaScript code outside a web browser.
//MongoDB is an open source NoSQL database that saves the data in JSON format, instead of Relational Database (RDBMS).
// Node.js  is a server side platform used for development of web applications
//Node.js as server side language
//Node.js handles the client/server requests and ExpressJS makes request to the database.
const express = require('express');
const app = express();
var mongoose = require('mongoose');

// set our port
const port = 3000;

// configuration ===========================================

// config files
var db = require('./config/db');
console.log("connecting--",db);
mongoose.connect(db.url); //Mongoose connection created


app.get('/', (req, res) => res.send('Welcome to Tutorialspoint!'));

//defining route
app.get('/tproute', function (req, res) {
    res.send('This is routing for the application developed using Node and Express...');
 });


 // sample api route
// grab the student model we just created
var Student = require('./app/models/students');
app.get('/api/students', function(req, res) {
   // use mongoose to get all students in the database
   Student.find().then(function(err, students) {
      // if there is an error retrieving, send the error.
      // nothing after res.send(err) will execute
      if (err)
         res.send(err);
      res.json(students); // return all students in JSON format  ;no braces for single line if else 
   });

   
   app.post('/api/students/send', function (req, res) {
    var student = new Student(); // create a new instance of the student model
    student.name = req.body.name; // set the student name (comes from the request)
    student.save(function(err) {
       if (err)
          res.send(err);
          res.json({ message: 'student created!' });
    });
 });  

});
// startup our app at http://localhost:3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));