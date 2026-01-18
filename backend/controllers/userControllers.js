import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../model/UserModel.js"

export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("enrolledCourses")

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `GetCurrentUser error ${error}` })
    }
}
export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId
        console.log("Update Profile Request - userId:", userId);
        console.log("Update Profile Request - body:", req.body);
        console.log("Update Profile Request - file:", req.file);

        const { description, name } = req.body
        const updateData = {}
        if (name) updateData.name = name
        if (description) updateData.description = description

        if (req.file) {
            console.log("Uploading image to Cloudinary...");
            updateData.photoUrl = await uploadOnCloudinary(req.file.path)
            console.log("Cloudinary Upload Success - photoUrl:", updateData.photoUrl);
        }

        console.log("Updating user in database - updateData:", updateData);
        const user = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true }).select("-password").populate("enrolledCourses")

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: `Update Profile error ${error}` })
    }
}