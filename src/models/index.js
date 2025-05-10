const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT || 'sqlite',
    storage: process.env.DB_STORAGE || path.join(__dirname, '../../database.sqlite'),
    logging: false
});

const models = {
    AppUser: require('./AppUser')(sequelize),
    TypeDocument: require('./TypeDocument')(sequelize),
    UserDocument: require('./UserDocument')(sequelize),
    Country: require('./Country')(sequelize),
    ContactInfo: require('./ContactInfo')(sequelize)
};

// Definir relaciones
Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

module.exports = {
    sequelize,
    ...models
};