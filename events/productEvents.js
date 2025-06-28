const EventEmitter = require('events');

class ProductEmitter extends EventEmitter { }

const productEmitter = new ProductEmitter();

module.exports = productEmitter;
