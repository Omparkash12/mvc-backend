const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../models/File'); // Import the File model
const fileEmitter = require('../events/fileEvents');  // Event emitter for file uploads

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);  // Create directory if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Rename the file to avoid conflicts
  },
});

// Multer upload middleware
const upload = multer({ storage: storage });

// Service function to handle file upload
exports.uploadFile = (req, res, next) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return next(err);  // If an error occurs, pass it to the next middleware
    }

    // Save the file details into the PostgreSQL database using Sequelize
    try {
      const file = req.file;
      const filePath = path.join('uploads', file.filename); // Relative file path

      // Insert the file details into the PostgreSQL database
      const savedFile = await File.create({
        filename: file.filename,
        filepath: filePath,
        mimetype: file.mimetype,
      });

      // Emit the 'fileUploaded' event
      fileEmitter.emit('fileUploaded', savedFile);

      res.status(200).json({
        message: 'File uploaded and saved successfully!',
        file: savedFile,
      });
    } catch (error) {
      next(error);  // Pass any error to the next middleware
    }
  });
};
