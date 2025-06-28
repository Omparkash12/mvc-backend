// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const File = require('../models/File'); // Import the File model
// const fileEmitter = require('../events/fileEvents');  // Event emitter for file uploads

// // Set up Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = 'uploads/';
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath);  // Create directory if it doesn't exist
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));  // Rename the file to avoid conflicts
//   },
// });

// // Multer upload middleware
// const upload = multer({ storage: storage });

// // Service function to handle file upload
// exports.uploadFile = (req, res, next) => {
//   upload.single('file')(req, res, async (err) => {
//     if (err) {
//       return next(err);  // If an error occurs, pass it to the next middleware
//     }

//     // Save the file details into the PostgreSQL database using Sequelize
//     try {
//       const file = req.file;
//       const filePath = path.join('uploads', file.filename); // Relative file path

//       // Insert the file details into the PostgreSQL database
//       const savedFile = await File.create({
//         filename: file.filename,
//         filepath: filePath,
//         mimetype: file.mimetype,
//       });

//       // Emit the 'fileUploaded' event
//       fileEmitter.emit('fileUploaded', savedFile);

//       res.status(200).json({
//         message: 'File uploaded and saved successfully!',
//         file: savedFile,
//       });
//     } catch (error) {
//       next(error);  // Pass any error to the next middleware
//     }
//   });
// };















// const cloudinary = require('cloudinary').v2; // Import Cloudinary
// const path = require('path');
// const fs = require('fs');
// const File = require('../models/File'); // Import the File model
// const fileEmitter = require('../events/fileEvents'); // Event emitter for file uploads

// // Cloudinary Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Service function to handle file upload
// exports.uploadFile = (req, res, next) => {
//   // Ensure that the files exist in req.files
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).json({ message: 'No files uploaded.' });
//   }

//   const uploadPromises = req.files.map((file) => {
//     // Upload file to Cloudinary
//     return cloudinary.uploader.upload(file.path, {
//       public_id: Date.now() + path.extname(file.originalname), // Set a unique public ID
//       resource_type: 'auto', // Automatically detect file type (image, video, pdf, etc.)
//     })
//       .then((cloudinaryResult) => {
//         // Save the file details (filename, Cloudinary URL, mime type) in the database
//         console.log("cloudinaryResult ::", cloudinaryResult);

//         return File.create({
//           filename: file.filename,
//           filepath: cloudinaryResult.secure_url, // Save Cloudinary URL
//           mimetype: file.mimetype,
//         })
//           .then((savedFile) => {
//             // Emit event after file upload (optional)
//             fileEmitter.emit('fileUploaded', savedFile);

//             // Optionally delete the file from the server to save space
//             fs.unlinkSync(file.path);

//             return savedFile;
//           })
//           .catch((error) => {
//             console.error('Error saving file details:', error);
//             throw error; // Propagate error to be caught in the parent promise
//           });
//       })
//       .catch((error) => {
//         console.error('Error during Cloudinary upload:', error);
//         throw error; // Propagate error to be caught in the parent promise
//       });
//   });

//   // Wait for all uploads to complete
//   Promise.all(uploadPromises)
//     .then((uploadedFiles) => {
//       // Send a successful response with all file details
//       res.status(200).json({
//         message: 'Files uploaded and saved successfully!',
//         files: uploadedFiles,
//       });
//     })
//     .catch((error) => {
//       next(error); // Pass any error to the next middleware
//     });
// };













const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
const File = require('../models/files');
const fileEmitter = require('../events/filesEvents');

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Service function to handle file upload
exports.uploadFile = (req, res, next) => {
  // Ensure that the files exist in req.files
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }

  const uploadPromises = req.files.map((file) => {
    // Upload file to Cloudinary
    return cloudinary.uploader.upload(file.path, {
      public_id: Date.now() + path.extname(file.originalname), // Set a unique public ID
      resource_type: 'auto', // Automatically detect file type (image, video, pdf, etc.)
    })
      .then((cloudinaryResult) => {
        // Save the file details (filename, Cloudinary URL, mime type) in the database
        return File.create({
          filename: file.filename,
          filepath: cloudinaryResult.secure_url, // Save Cloudinary URL
          mimetype: file.mimetype,
          userId: req.user.userId, // Associate the file with the authenticated user
        })
          .then((savedFile) => {
            // Emit event after file upload (optional)
            fileEmitter.emit('fileUploaded', savedFile);

            // Optionally delete the file from the server to save space
            fs.unlinkSync(file.path);

            return savedFile;
          })
          .catch((error) => {
            console.error('Error saving file details:', error);
            throw error; // Propagate error to be caught in the parent promise
          });
      })
      .catch((error) => {
        console.error('Error during Cloudinary upload:', error);
        throw error; // Propagate error to be caught in the parent promise
      });
  });

  // Wait for all uploads to complete
  Promise.all(uploadPromises)
    .then((uploadedFiles) => {
      // Send a successful response with all file details
      res.status(200).json({
        message: 'Files uploaded and saved successfully!',
        files: uploadedFiles,
      });
    })
    .catch((error) => {
      next(error); // Pass any error to the next middleware
    });
};
