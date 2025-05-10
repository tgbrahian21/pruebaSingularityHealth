const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Country = sequelize.define('Country', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CountryCode: {
            type: DataTypes.STRING(4),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        CountryName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        tableName: 'Country_TB',
        timestamps: false
    });

    Country.associate = ({ ContactInfo }) => {
        Country.hasMany(ContactInfo, {
            foreignKey: 'CountryID',
            as: 'contactInfos'
        });
    };

    return Country;
};