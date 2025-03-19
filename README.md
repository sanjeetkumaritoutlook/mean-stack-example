## main MEAN app named-> mean-stack-example
### client
run : ng s
ng help
ng version
(16)
this runs on port 4200

### server
npx ts-node src/server.ts
this runs on port 5200
this act as middleman between client and Database
this is express.js web server port

### local MongoDB instance
mongodb://localhost:27017

## this contains two app
1. employees add

2. login->register->logout with JWT token



## Database
A database in MongoDB is a container that holds one or more collections. It is similar to a database in a traditional relational database system.
Examples of Databases:
meanStackExample (used for a MEAN application).
Commands to Work with Databases:
Switch to a database:
use databaseName;

List all databases:
show dbs;

##  Collection
A collection is a group of MongoDB documents, similar to a table in a relational database. However, unlike tables, collections in MongoDB do not enforce a fixed schema, meaning documents within a collection can have different structures.
Examples of Collections:
employees (to store employee data).
Commands to Work with Collections:
List all collections in a database
show collections;
Create a collection (optional, usually created when inserting data):
db.createCollection("collectionName");



## first is a standalone server that updates mongodb students 
run
node server.js
http://localhost:3000/
http://localhost:3000/tproute
http://localhost:3000/api/students
