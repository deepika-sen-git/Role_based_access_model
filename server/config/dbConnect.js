const mongoose = require("mongoose");
const dbConnect = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connection established to", db.connection.host);
        
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = dbConnect;