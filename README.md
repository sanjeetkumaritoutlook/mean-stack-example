## main MEAN app named-> mean-stack-example
### client
run :

npm install

```
ng s
```
ng help

ng version

(16)
this runs on port 4200

```
ng generate environments
```

### server [ same as nest-proxy routing different API calls to services]
npm install

```
npx ts-node src/server.ts
```

this runs on port 5200

this act as middleman between client and Database

this is express.js web server port

## mongodb Atlas free tier
project

cluster

create separate .env file in server folder for local development
```
 ATLAS_URI= connection_string
 JWT_SECRET="your_value"  
 PORT=5200
```
### local MongoDB instance
Instead of using Mongoose, let's use the MongoDB Native Driver.

This means no schemas, but you get direct control over MongoDB operations.

no need to install mongoose (npm install -g mongosh). just mongodb compass enough

mongodb://localhost:27017

## this contains two functionalities with client -> server -> database
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

## ✅ User Authentication (Register/Login using users collection)
✅ Employee Management (CRUD operations using employees collection)

✅ MongoDB Native Driver Setup (No Mongoose, fully optimized)

✅ Correct API Responses (Fixed issues with NG02200 and incorrect API structures)

✅ Dynamic Collection Handling (Using getCollection("users") and getCollection("employees"))

✅  Hash Passwords Before Saving in MongoDB, bcrypt is hashing passwords

## JWT is used for authentication and authorization. Here's the typical flow:

✅ Step-by-Step JWT Authentication Flow

1️⃣ User logs in (POST /api/auth/login) by providing a username and password.

2️⃣ Server verifies credentials and generates a JWT token signed with JWT_SECRET.

3️⃣ Server sends the JWT to the frontend (React/Angular/Vue) as a response

4️⃣ Frontend stores the JWT (usually in localStorage or sessionStorage).

5️⃣ On subsequent requests, the frontend sends the token in the Authorization header: Authorization Bearer

5.5 Angular automatically attach thhis token to protected API calls/requests using HttpInterceptor

6️⃣  Server validates the token on protected routes (employees, dashboard, etc.).

7️⃣ If valid, access is granted. If invalid or expired, the user is logged out.

ng generate interceptor interceptors/token

✔ Login works without Authorization header because login is public.

✔ For protected routes, JWT must be attached in the Authorization header.

✔ TokenInterceptor automatically adds the JWT for all HTTP requests.


## first is a standalone server that updates mongodb students 
run:

node server.js

http://localhost:3000/

http://localhost:3000/tproute

http://localhost:3000/api/students
