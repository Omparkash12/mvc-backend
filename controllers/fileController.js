const fileService = require('../services/fileService');

exports.uploadFile = (req, res, next) => {
    fileService.uploadFile(req, res, next);
};
