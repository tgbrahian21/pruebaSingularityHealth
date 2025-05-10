const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TypeDocument = sequelize.define('TypeDocument', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NameTypeDocument: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        tableName: 'TypeDocument_TB',
        timestamps: false
    });

    TypeDocument.associate = ({ UserDocument }) => {
        TypeDocument.hasMany(UserDocument, { foreignKey: 'TypeDocumentID' });
    };

    return TypeDocument;
};