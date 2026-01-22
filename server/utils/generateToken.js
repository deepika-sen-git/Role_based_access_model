const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    const token = jwt.sign(
        {id: userId},
        process.env.JWT_SECRET_KEY
    )
    return token;
}

module.exports = generateToken;