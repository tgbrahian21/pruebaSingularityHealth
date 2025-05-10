const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const AppUser = sequelize.define('AppUser', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        LastName: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        Name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        IsMilitar: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        TimeCreate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        IsTemporal: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(value, salt);
                this.setDataValue('password', hash);
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        verificationToken: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'AppUser_TB',
        timestamps: false
    });

    AppUser.associate = ({ UserDocument, ContactInfo }) => {
        AppUser.hasMany(UserDocument, {
            foreignKey: 'UserID',
            as: 'documents'  // Alias explícito
        });
        AppUser.hasOne(ContactInfo, {
            foreignKey: 'UserID',
            as: 'contactInfo'
        });
    };

    return AppUser;
};