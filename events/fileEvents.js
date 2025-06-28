// events/fileEvents.js
const EventEmitter = require('events');
const fileEmitter = new EventEmitter();

// Listen for the 'fileUploaded' event
fileEmitter.on('fileUploaded', (file) => {
    console.log(`✅ File uploaded: ${file.filename}`);
    // Perform any additional actions here (e.g., send notifications, log activity)
});

module.exports = fileEmitter;
