// const express = require('express');
// const router = express.Router();
// const fileController = require('../controllers/fileController');

// router.post('/upload', fileController.uploadFile);

// module.exports = router;



const express = require('express');
const router = express.Router();
const fileController = require('../controllers/filesController');
const upload = require('../middlewares/multerMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// POST route to handle file upload
router.post('/upload', authMiddleware.verifyToken, upload.array('files', 10), fileController.uploadFile);

module.exports = router;
