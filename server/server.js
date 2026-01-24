const express = require("express");
const cors = require("cors");
// const os = require('os');

// console.log(os.cpus().length);
// console.log(os.totalmem());
// console.log(os.platform());

const app = express();
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoute");
const dbConnect = require("./config/dbConnect");
const userRoutes = require("./routes/userRoute");

app.use(express.json())
app.use(cors({ origin: true }));
dbConnect();
dotenv.config();

const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.json({
        message: "Hiiii"
    })
})
// app.post("/register", (req, res) => {
//     const {name, phone, email, date, time, role} = req.body;
//     console.log({name, phone, email, date, time, role});
    
// res.json({
//     name, phone, email, date, time, role
// })
// })
app.use("/", authRoutes);
app.use("/", userRoutes);

// app.listen(3000, console.log("App is running on port 3000"))
app.listen(PORT, console.log("App is running on port", PORT))

