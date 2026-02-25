const multer = require('multer');
const CloudinaryStorage = require('multer-storage-cloudinary');
import cloudinary from '../config/cloudinary';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'sohoza-uploads', // The name of the folder in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    } as any, // Type assertion needed due to incomplete types in the library
});

export const upload = multer({ storage: storage });
