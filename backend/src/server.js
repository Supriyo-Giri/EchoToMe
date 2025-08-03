import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import path from "path"; 
// const requestLogger = require('./middlewares/requestLogger.js');
import requestLogger from "./middlewares/requestLogger.js"
import rateLimiter from "./middlewares/rateLimiter.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

//Middlewares
app.use(cors());
app.use(requestLogger); // Logs all the incoming request
app.use(express.json()); // parse JSON body
app.use(rateLimiter);

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use("/api/notes",notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// app.get("/api/notes",(req,res)=>{
//     res.send("This is notes route");
// })

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server started at port: ${PORT}`)
    });
});

