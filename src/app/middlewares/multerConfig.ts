import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../utils/cloudinaryConfig";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "medimart/uploads", // Correct placement inside params function
    format: "webp", // Ensure file format is webp
    public_id: file.originalname.split(".")[0], // Keep original name
  }),
});

const upload = multer({ storage });

export default upload;
