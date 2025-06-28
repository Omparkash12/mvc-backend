const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    category: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    ratingRate: {
        type: DataTypes.FLOAT,
        field: 'rating_rate',
    },
    ratingCount: {
        type: DataTypes.INTEGER,
        field: 'rating_count',
    }
}, {
    tableName: 'products',
    timestamps: false,
});

module.exports = Product;
