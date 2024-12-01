import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js'; // Make sure to have a database configuration file

class Member extends Model { }

Member.init({
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  }, role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  }, position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,

  },
  entryDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  exitDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  skills: {
    type: DataTypes.JSON, // Array of skills stored as JSON
    allowNull: true,
  },
  contacts: {
    type: DataTypes.JSON, // Array of contacts stored as JSON
    allowNull: true,
  }, isActive: {
    type: DataTypes.BOOLEAN, // Array of contacts stored as JSON
    allowNull: true,
  },
  profile: {
    type: DataTypes.STRING, // Array of contacts stored as JSON
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Member',
  tableName: 'members',
  timestamps: true, // Adds createdAt and updatedAt
});

export default Member;
