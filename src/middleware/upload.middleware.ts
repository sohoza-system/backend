import multer from 'multer';

// ✅ Use memory storage — upload buffer to Cloudinary manually in the controller
// This works with cloudinary@2 without any adapter package
const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
    fileFilter: (_req, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (allowed.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only jpg, png, webp, gif images are allowed'));
        }
    },
});