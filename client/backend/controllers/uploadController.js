export const uploadAvatar = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "TutorLink",
    });

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        avatar: result.secure_url,
      },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
