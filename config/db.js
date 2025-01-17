//setup the connection file here
//MongoDB Compass App
//test is the database name.
//students is collection name
//insert a record in mongodb
//https://www.mongodb.com/docs/compass/current/documents/insert/
//https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/
//MongoDB Shell (mongosh) shell  - in C drive Program Files
//https://www.youtube.com/watch?v=EIk3PamplX0
//mongo daemon
//mongo shell sart in command prompt-> C:\Program Files\MongoDB\Server\5.0\bin
//connect and start mongodb server -> through command prompt-> mongod
//https://www.digitalocean.com/community/tutorials/how-to-use-the-mongodb-shell
//show dbs

//https://www.w3schools.com/mongodb/mongodb_mongosh_insert.php
//https://www.youtube.com/watch?v=p4ouSQqP3L0
//just click connect in mongodb compass- by default port is 27017
// application interacting via a REST API with our database by using HTTP methods.
module.exports = {
    // url : 'mongodb://localhost:27017/test'
    url : 'mongodb://0.0.0.0:27017/test'
 }