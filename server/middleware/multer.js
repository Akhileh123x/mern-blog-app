import multer from 'multer';

// Configure storage settings
const storage = multer.diskStorage({

  // Set upload folder
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // files will be saved in "uploads" folder
  },

  // Set unique filename
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // prevent name conflicts
  }
});

// Create multer instance with storage config
const upload = multer({ storage });

// Export for use in routes
export default upload;