const typeDefs = `#graphql
  type TypeDocument {
    id: Int!
    NameTypeDocument: String!
  }

  type Country {
    id: Int!
    CountryCode: String!
    CountryName: String!
  }

  type UserDocument {
    Document: String!
    TypeDocumentID: Int!
    typeDocument: TypeDocument  
    PlaceExpedition: String!
    DateExpedition: String!
  }

  type ContactInfo {
    Address: String!
    CountryID: Int!
    country: Country  
    City: String!
    Phone: String
    CellPhone: String
    EmergencyName: String
    EmergencyPhone: String
  }

  type AppUser {
    id: Int!
    LastName: String!
    Name: String!
    IsMilitar: Boolean!
    TimeCreate: String!
    IsTemporal: Boolean!
    username: String!
    email: String!
    emailVerified: Boolean!
    documents: [UserDocument]
    contactInfo: ContactInfo
  }

  input TypeDocumentInput {
    NameTypeDocument: String!
  }

  input CountryInput {
    CountryCode: String!
    CountryName: String!
  }

  input UserDocumentInput {
    Document: String!
    TypeDocumentID: Int!
    PlaceExpedition: String!
    DateExpedition: String!
  }

  input ContactInfoInput {
    Address: String!
    CountryID: Int!
    City: String!
    Phone: String
    CellPhone: String
    EmergencyName: String
    EmergencyPhone: String
  }

  input RegisterInput {
    LastName: String!
    Name: String!
    IsMilitar: Boolean
    username: String!
    password: String!
    email: String!
    document: UserDocumentInput!
    contactInfo: ContactInfoInput!
  }

  type Mutation {
    registerUser(input: RegisterInput!): AppUser
    createTypeDocument(input: TypeDocumentInput!): TypeDocument
    createCountry(input: CountryInput!): Country
  }

  type Query {
    getUser(id: Int!): AppUser
    getTypeDocuments: [TypeDocument]
    getCountries: [Country]
    userExists(email: String!, username: String!): UserExistsResponse
  }

  type UserExistsResponse {
    emailExists: Boolean!
    usernameExists: Boolean!
  }
`;

module.exports = typeDefs;