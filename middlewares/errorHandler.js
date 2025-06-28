module.exports = (err, req, res, next) => {
    console.error(err);

    if (err.isOperational) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    // For unexpected or programming errors
    res.status(500).json({ error: 'Something went wrong! Please try again later.' });
};
