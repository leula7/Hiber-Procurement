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
        cat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bid_price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        bid_file: {
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
        tech_expire_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        financial_start_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        },
        {
            tableName: 'bid',
            timestamps: false,
        }
    );

  export default GenBid;