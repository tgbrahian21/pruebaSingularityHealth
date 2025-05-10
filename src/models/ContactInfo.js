const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ContactInfo = sequelize.define('ContactInfo', {
        Address: {
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        City: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        Phone: {
            type: DataTypes.STRING(20)
        },
        CellPhone: {
            type: DataTypes.STRING(20)
        },
        EmergencyName: {
            type: DataTypes.STRING(100)
        },
        EmergencyPhone: {
            type: DataTypes.STRING(20)
        }
    }, {
        tableName: 'ContactInfo_TB',
        timestamps: false
    });

    ContactInfo.associate = ({ AppUser, Country }) => {
        ContactInfo.belongsTo(AppUser, {
            foreignKey: 'UserID',
            as: 'user'
        });
        ContactInfo.belongsTo(Country, {
            foreignKey: 'CountryID',
            as: 'country'
        });
    };

    return ContactInfo;
};