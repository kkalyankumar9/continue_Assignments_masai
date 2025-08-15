const express = require("express");
const { connection } = require("./db");
const { authRouter } = require("./routes/authRoute");
const cookieParser = require("cookie-parser");
const allBooksRouter = require("./routes/allBooks");
const { myBooksRouter } = require("./routes/myBooksRouter");
require("dotenv").config();

 const cors = require("cors");



const app= express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());// <-- THIS is required to read cookies from req.cookies

app.get("/", (req, res) => {
    res.send("Welcome to the Mini Project Server");
});

app.use("/api/auth",authRouter);
app.use("/api",allBooksRouter);
app.use("/api/mybooks", myBooksRouter);


app.listen(process.env.PORT, async () => {
    try {
            await connection;
   console.log("✅ Connected to MongoDB");
    console.log(`🚀 Server running on port ${process.env.PORT}`);
        
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); 
    }
   

});