const profileController = (req, res) => {
   try {
     const user = req.user;

    res.json({
        success:true,
        user,
        message:"User details fetched sucessfully"
    })

   } catch (error) {
    res.json({
        message:error.message
    })
   }
}
module.exports = {profileController};