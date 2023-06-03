import { DataTypes } from "sequelize";
import sequelize from '../../connection/database.js';

    const GenBid = sequelize.define('Bid', {
        bid_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        prop_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bid_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        tender_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        expire_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        },
        {
            tableName: 'bid',
            timestamps: false,
        }
    );

  export default GenBid;