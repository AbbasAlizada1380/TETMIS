import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js'; // Make sure to have a database configuration file

class Incomes extends Model { }

Incomes.init({
    source: {
        type: DataTypes.STRING,
        allowNull: false,
    }, amount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    takingDate: {
        type: DataTypes.DATE,
        allowNull: false,

    }
}, {
    sequelize,
    modelName: 'Expense',
    tableName: 'Expense',
    timestamps: true, // Adds createdAt and updatedAt
});

export default Expense;
