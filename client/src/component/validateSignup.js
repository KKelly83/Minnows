// validateSignup.js

function validateSignup(email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lowerCaseRegex = /[a-z]/g;
    const upperCaseRegex = /[A-Z]/g;
    const numberRegex = /[0-9]/g;
    const specialCharRegex = /[!@#$%^&*]/g;

    let validationCriteriaMet = 0;

    if (password.match(lowerCaseRegex)) validationCriteriaMet++;
    if (password.match(upperCaseRegex)) validationCriteriaMet++;
    if (password.match(numberRegex)) validationCriteriaMet++;
    if (password.match(specialCharRegex)) validationCriteriaMet++;

    return email.match(emailRegex) &&
           password.length >= 8 &&
           validationCriteriaMet >= 3;
}

module.exports = validateSignup;
