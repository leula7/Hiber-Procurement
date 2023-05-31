import { DataTypes } from 'sequelize';
import sequelize from '../../connection/database.js';

const Bid = sequelize.define('Bid', {
bid_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tender_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
    tableName: 'bid',
  timestamps: false
});

export { Bid };
