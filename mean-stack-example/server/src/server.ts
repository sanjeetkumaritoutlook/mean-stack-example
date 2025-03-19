import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
//import { connectToDatabase } from "./database";
import { connectToDatabase } from "./models/User"; // ✅ Now using native MongoDB driver

import { employeeRouter } from "./employee.routes";
import authRoutes from "./routes/auth";


// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
const { ATLAS_URI } = process.env;
 
if (!ATLAS_URI) {
   console.error("No ATLAS_URI environment variable has been defined in config.env");
   process.exit(1);
}
 const uri = 'mongodb://localhost:27017/meanStackExample';
// connectToDatabase(uri)
//    .then(() => {
//        const app = express();
//        app.use(cors());
//        app.use(express.json()); // ✅ Required for parsing JSON bodies
//        app.use("/api/auth", authRoutes);
//        app.use("/employees", employeeRouter);


//        // start the Express server
//        app.listen(5200, () => {
//            console.log(`Server running at http://localhost:5200...`);
//        });
 
//    })
//    .catch(error => console.error(error));

connectToDatabase().then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/api/auth", authRoutes);
    app.use("/employees", employeeRouter);

    app.listen(5200, () => {
        console.log("🚀 Server running at http://localhost:5200...");
    });
}).catch(error => console.error("❌ Failed to start server:", error));


   //start the app
   //npx ts-node src/server.ts
