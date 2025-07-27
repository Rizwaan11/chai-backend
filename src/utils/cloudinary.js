import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto", // Automatically detect resource type (image, video, etc.)
    });
    console.log("File uploaded to Cloudinary:", result.url);
    // fs.unlinkSync(filePath); // Remove the file after upload
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    fs.unlinkSync(filePath); // Remove the file to save space on our server
    return null;
  }
};

export { uploadOnCloudinary };
