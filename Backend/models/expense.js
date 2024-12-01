import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js'; // Make sure to have a database configuration file

class Expense extends Model { }

Expense.init({
    for: {
        type: DataTypes.STRING,
        allowNull: false,
    }, amount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    person: {
        type: DataTypes.STRING,
        allowNull: false,

    }
}, {
    sequelize,
    modelName: 'Expense',
    tableName: 'Expense',
    timestamps: true, // Adds createdAt and updatedAt
});

export default Expense;
