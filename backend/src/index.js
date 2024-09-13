// index.js
import dotenv from "dotenv";
import { app } from "./app.js";
import http from 'http';
import { connectDB } from "./database/Db.js";
import mongoose from "mongoose";
// import { server, io } from "./socket.js";  // Destructure the named exports
const server = http.createServer(app);


// Load environment variables
dotenv.config({
    path: "./.env"
});

// Connect to MongoDB
mongoose.set('debug', true);
connectDB().then(() => {
    const port = process.env.PORT || 8000;

    // Start the HTTP server
    server.listen(port, () => {
        console.log(`Server listening at port ${port}`);
    });

    // Handle WebSocket connections
    
}).catch((error) => console.log(error));

