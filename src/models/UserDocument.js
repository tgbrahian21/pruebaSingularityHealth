const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserDocument = sequelize.define('UserDocument', {
        Document: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        PlaceExpedition: {
            type: DataTypes.STRING(60)
        },
        DateExpedition: {
            type: DataTypes.DATEONLY
        }
    }, {
        tableName: 'UserDocument_TB',
        timestamps: false
    });

    UserDocument.associate = ({ AppUser, TypeDocument }) => {
        UserDocument.belongsTo(AppUser, {
            foreignKey: 'UserID',
            as: 'user'
        });
        UserDocument.belongsTo(TypeDocument, {
            foreignKey: 'TypeDocumentID',
            as: 'typeDocument'
        });
    };

    return UserDocument;
};