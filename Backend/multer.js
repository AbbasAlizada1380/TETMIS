import multer from 'multer';
import path from 'path';

// Configure storage settings for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('uploads/')); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Ensure unique filenames
  },
});

// File filter to validate file type (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'), false); // Reject file
  }
};

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
  fileFilter,
});

export default upload;
