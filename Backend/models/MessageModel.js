import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Message extends Model {}

Message.init({
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
  message: { type: DataTypes.TEXT, allowNull: false },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  verificationToken: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'Message',
  tableName: 'messages',
});

export default Message;
