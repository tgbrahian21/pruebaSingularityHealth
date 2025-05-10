const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { validateEmail, validatePassword } = require('../utils/validators');

const resolvers = {
    Query: {
        async getUser(_, { id }, { db }) {
            return await db.AppUser.findByPk(id, {
                include: [
                    {
                        model: db.UserDocument,
                        as: 'documents',
                        include: [{
                            model: db.TypeDocument,
                            as: 'typeDocument'
                        }]
                    },
                    {
                        model: db.ContactInfo,
                        as: 'contactInfo',
                        include: [{
                            model: db.Country,
                            as: 'country'
                        }]
                    }
                ]
            });
        },

        async getTypeDocuments(_, __, { db }) {
            return await db.TypeDocument.findAll();
        },

        async getCountries(_, __, { db }) {
            return await db.Country.findAll();
        },

        async userExists(_, { email, username }, { db }) {
            const emailExists = await db.AppUser.findOne({ where: { email } });
            const usernameExists = await db.AppUser.findOne({ where: { username } });

            return {
                emailExists: !!emailExists,
                usernameExists: !!usernameExists
            };
        }
    },

    Mutation: {
        async registerUser(_, { input }, { db }) {

            if (!validateEmail(input.email)) {
                throw new Error('Email inválido');
            }

            if (!validatePassword(input.password)) {
                throw new Error('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número');
            }


            const typeDocument = await db.TypeDocument.findByPk(input.document.TypeDocumentID);
            if (!typeDocument) {
                throw new Error('El tipo de documento especificado no existe');
            }

            const country = await db.Country.findByPk(input.contactInfo.CountryID);
            if (!country) {
                throw new Error('El país especificado no existe');
            }


            const existingUser = await db.AppUser.findOne({
                where: {
                    [Op.or]: [
                        { username: input.username },
                        { email: input.email }
                    ]
                }
            });

            if (existingUser) {
                throw new Error('El usuario o email ya está registrado');
            }

            const existingDocument = await db.UserDocument.findOne({
                where: { Document: input.document.Document }
            });

            if (existingDocument) {
                throw new Error('El documento ya está registrado');
            }


            const user = await db.AppUser.create({
                LastName: input.LastName,
                Name: input.Name,
                IsMilitar: input.IsMilitar || false,
                username: input.username,
                password: input.password,
                email: input.email,
                emailVerified: false,
                verificationToken: jwt.sign({ email: input.email }, process.env.JWT_SECRET, { expiresIn: '1d' })
            });


            await db.UserDocument.create({
                UserID: user.id,
                Document: input.document.Document,
                TypeDocumentID: input.document.TypeDocumentID,
                PlaceExpedition: input.document.PlaceExpedition,
                DateExpedition: input.document.DateExpedition
            });


            await db.ContactInfo.create({
                UserID: user.id,
                Address: input.contactInfo.Address,
                CountryID: input.contactInfo.CountryID,
                City: input.contactInfo.City,
                Phone: input.contactInfo.Phone,
                CellPhone: input.contactInfo.CellPhone,
                EmergencyName: input.contactInfo.EmergencyName,
                EmergencyPhone: input.contactInfo.EmergencyPhone
            });


            return await db.AppUser.findByPk(user.id, {
                include: [
                    {
                        model: db.UserDocument,
                        as: 'documents',
                        include: [{
                            model: db.TypeDocument,
                            as: 'typeDocument'
                        }]
                    },
                    {
                        model: db.ContactInfo,
                        as: 'contactInfo',
                        include: [{
                            model: db.Country,
                            as: 'country'
                        }]
                    }
                ]
            });
        },

        async createTypeDocument(_, { input }, { db }) {
            try {
                return await db.TypeDocument.create({
                    NameTypeDocument: input.NameTypeDocument
                });
            } catch (error) {
                console.error("Error creating document type:", error);
                throw new Error('Error al crear el tipo de documento');
            }
        },

        async createCountry(_, { input }, { db }) {
            try {
                return await db.Country.create({
                    CountryCode: input.CountryCode,
                    CountryName: input.CountryName
                });
            } catch (error) {
                console.error("Error creating country:", error);
                throw new Error('Error al crear el país');
            }
        }
    },

    // Resolvers para tipos
    AppUser: {
        documents: (parent, _, { db }) => {
            return db.UserDocument.findAll({ where: { UserID: parent.id } });
        },
        contactInfo: (parent, _, { db }) => {
            return db.ContactInfo.findOne({ where: { UserID: parent.id } });
        }
    },

    UserDocument: {
        typeDocument: (parent, _, { db }) => {
            return db.TypeDocument.findByPk(parent.TypeDocumentID);
        }
    },

    ContactInfo: {
        country: (parent, _, { db }) => {
            return db.Country.findByPk(parent.CountryID);
        }
    }
};

module.exports = resolvers;