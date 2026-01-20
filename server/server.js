const express = require("express");
const os = require('os');

console.log(os.cpus().length);
console.log(os.totalmem());
console.log(os.platform());

const app = express();
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT

// app.listen(3000, console.log("App is running on port 3000"))
app.listen(PORT, console.log("App is running on port", PORT))

