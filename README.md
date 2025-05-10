# Prueba tecnica Backend Singularity Health 

## 📌 Requisitos previos

Antes de iniciar el proyecto, asegúrate de tener instalado:

- Node.js (v16 o superior)

- npm o yarn

- SQLite (para desarrollo, ya configurado en tu .env)

- Git (opcional)

## 🚀 Configuración inicial

### 1. Clonar el repositorio

    git clone 
    cd 

### 2. Instalar las dependencias

    npm install

### 3. Configuracion de variables de entorno

Crea un archivo .env en la raíz del proyecto con los siguientes datos:
    
    # Configuración de la aplicación
    PORT=4000
    GRAPHQL_PATH=/graphql

    # Configuración de seguridad
    JWT_SECRET=tu_clave_secreta_jwt

    # Configuración de base de datos (SQLite para desarrollo)
    DB_DIALECT=sqlite
    DB_STORAGE=./database.sqlite

### 4. Iniciar el servidor

    npm run dev

El servidor GraphQL estará disponible en:
🔗 http://localhost:4000/graphql

## 🔍 Consultas disponibles (Queries)

### 1. Verificar si un usuario existe

    query UserExists($email: String!, $username: String!) {
    userExists(email: $email, username: $username) {
    emailExists
    usernameExists
    }
    }

### Variables:

    {
    "email": "ejemplo@test.com",
    "username": "testuser"
    }

### 2. Obtener un usuario por ID

    query GetUser($id: Int!) {
    getUser(id: $id) {
    id
    Name
    LastName
    email
    username
    documents {  
    PlaceExpedition
    typeDocument {
    NameTypeDocument
    }
    }
    contactInfo {  
    Address
    country {
    CountryName
    }
    }
    }
    }

### Variables:

    {
    "id": 1
    }

### 3. Listar todos los tipos de documento

    query GetTypeDocuments {
    getTypeDocuments {
    id
    NameTypeDocument
    }
    }

### 4. Listar todos los países

    query GetCountries {
    getCountries {
    id
    CountryName
    CountryCode
    }
    }

## ✏️ Mutaciones disponibles (Mutations)

### 1. Registrar un nuevo usuario

    mutation RegisterUser($input: RegisterInput!) {
    registerUser(input: $input) {
    id
    username
    email
    }
    }

### Variables:

    {
    "input": {
    "LastName": "Pérez",
    "Name": "Juan",
    "username": "juanperez",
    "password": "Password123!",
    "email": "juan@test.com",
    "document": {
      "Document": "123456789",
    "TypeDocumentID": 1,  
    "PlaceExpedition": "Colombia",
    "DateExpedition": "2021-03-10"
    },
    "contactInfo": {
    "Address": "Calle 100 #15-60",
    "CountryID": 1,  
    "City": "Bogotá",
    "Phone": "6019876543",
    "CellPhone": "3201234567",
    "EmergencyName": "Emily Smith",
    "EmergencyPhone": "3207654321"
    }
    }
    }

### 2. Crear un tipo de documento
    
    mutation CreateTypeDocument($input: TypeDocumentInput!) {
    createTypeDocument(input: $input) {
    id
    NameTypeDocument
    }
    }

### Variables 

    {
    "input": {
    "NameTypeDocument": "Pasaporte"
    }
    }

### 3. Crear un país

    mutation CreateCountry($input: CountryInput!) {
    createCountry(input: $input) {
    id
    CountryName
    }
    }

### Variables:

    {
    "input": {
    "CountryCode": "US",
    "CountryName": "Estados Unidos"
    }
    }

## Desarrollado por:

brahian stid rojas castillo