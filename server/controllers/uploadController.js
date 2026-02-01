const cloudinary = require("../config/cloudinary");

exports.uploadImage = async (req, res) => {
  //   try {
  //     if (!req.file) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "No file uploaded",
  //       });
  //     }

  //     console.log(req.file);

  //     res.status(200).json({
  //       success: true,
  //       message: "Image uploaded successfully",
  //       file: req.file,
  //     });
  //   } catch (error) {
  //     res.status(500).json({
  //       success: false,
  //       message: error.message,
  //     });
  //   }

  try {
    // const result = await cloudinary.uploader.upload(req.file.path);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        // IMPORTANT: send buffer to cloudinary
        stream.end(req.file.buffer);
      });
    };

    const result = await uploadFromBuffer();

    res.status(200).json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
