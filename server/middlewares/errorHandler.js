const errorHandler = (err, req, res, next)=>{
    let statusCode = res.statusCode; 

    if (statusCode< 400) {
        statusCode = 500; 
    }

    res.status(statusCode).json({
        success: false, 
        message: err.message
    })
}

module.exports = errorHandler; 