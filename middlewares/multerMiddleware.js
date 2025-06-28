// const multer = require('multer');
// const storage = multer.memoryStorage();

// // Multer upload middleware (handles file uploads in memory, not local storage)
// const upload = multer({ storage: storage });

// module.exports = upload;




const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up Multer storage configuration (keeping temporary file storage on disk)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'temp_files/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Create directory if it doesn't exist
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // console.log("storage file ::", file);
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file to avoid conflicts
    },
});

// Multer upload middleware (handles file uploads locally before Cloudinary upload)
const upload = multer({ storage: storage });

module.exports = upload;
