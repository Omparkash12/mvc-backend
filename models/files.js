const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Files = sequelize.define('Files', {
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filepath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userId: {  // Foreign key to associate the file with a user
        type: DataTypes.INTEGER, // Matches the type of 'id' in User model
        allowNull: false,  // Ensure the file is always associated with a user
        references: {
            model: 'users', // Refers to the Users table
            key: 'id', // Refers to the 'id' field in the Users table
        },
        onDelete: 'CASCADE', // If a user is deleted, the associated files will also be deleted
    },
    uploaded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'files',
    timestamps: true,
});

module.exports = Files;
