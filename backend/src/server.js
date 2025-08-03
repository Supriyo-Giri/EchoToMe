import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
// const requestLogger = require('./middlewares/requestLogger.js');
import requestLogger from "./middlewares/requestLogger.js"
import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;



//Middlewares
app.use(cors());
app.use(requestLogger); // Logs all the incoming request
app.use(express.json()); // parse JSON body
app.use(rateLimiter);


app.use("/api/notes",notesRoutes);

// app.get("/api/notes",(req,res)=>{
//     res.send("This is notes route");
// })

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server started at port: ${PORT}`)
    });
});

