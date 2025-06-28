const fileService = require('../services/filesService');

exports.uploadFile = (req, res, next) => {
    fileService.uploadFile(req, res, next);
};
