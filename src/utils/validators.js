const validator = require('validator');

const passwordRequirements = {
    minLength: 8,
    requireUppercase: true,
    requireNumber: true,
    requireSpecialChar: false
};

function validateEmail(email) {
    if (!email) return false;
    return validator.isEmail(email);
}

function validatePassword(password) {
    if (!password || typeof password !== 'string') return false;

    let regex = '^';

    if (passwordRequirements.requireUppercase)
        regex += '(?=.*[A-Z])';
    if (passwordRequirements.requireNumber)
        regex += '(?=.*\\d)';
    if (passwordRequirements.requireSpecialChar)
        regex += '(?=.*[!@#$%^&*])';

    regex += `.{${passwordRequirements.minLength},}$`;

    return new RegExp(regex).test(password);
}

// Validación adicional opcional
function validateDocumentId(document) {
    // Implementación según requisitos de tu país
    return /^[a-zA-Z0-9]{6,20}$/.test(document);
}

module.exports = {
    validateEmail,
    validatePassword,
    validateDocumentId, // Opcional
    passwordRequirements
};