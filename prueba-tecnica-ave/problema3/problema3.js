const inputPassword = document.getElementById('password--visible');
const buttonSubmit = document.querySelector('#solution button[type="submit"]');
const resultText = document.querySelector('.results-text');


// Debe tener al menos 16 caracteres.
function firstValidation(password){
    return (password.length >= 16);
}

// Debe tener letras minúsculas y mayúsculas.
function secondValidation(password){
    if ( 
        (password.toLowerCase() === password.toUpperCase()) ||
        (password.toUpperCase() === password) ||
        (password.toLowerCase() === password) 
    ) {
        return false;
    }
    return true;
}

// No puede tener 2 letras iguales consecutivas.
function isLetter(char){
    return  ((char <= 'Z') && (char >= 'A') ||
            (char <= 'z') && (char >= 'a')) ||
            (char === 'ñ') || (char === 'Ñ')
}

function thirdValidation(password){
    for (let i=0; i < password.length - 1; i++){
        let currentChar = password.charAt(i);
        let nextChar = password.charAt(i+1);
        if (
            isLetter(currentChar) &&
            isLetter(nextChar) &&
            (currentChar == nextChar)
            ){
                   return false;
            }
    }
    return true;
}

// Debe contener al menos 4 números.
function fourthValidator(password){
    let count = 0;

    for (let i=0; i < password.length; i++){
        if (!isNaN(parseInt(password.charAt(i)))) {
            count++;
        }
    }

    if (count < 4){
        return false;
    }

    return true;
}

// No puede tener 2 números iguales consecutivos.
function fifthValidation(password){
    for (let i=0; i < password.length - 1; i++){
        let currentChar = password.charAt(i);
        let nextChar = password.charAt(i+1);
        if (
            !isNaN(parseInt(currentChar)) &&
            !isNaN(parseInt(nextChar)) &&
            (currentChar == nextChar)
            ){
                   return false;
            }
    }
    return true;
}

// Debe tener al menos 2 caracteres especiales (!@#$%ˆ&*-_+=?)
// pero ninguno de ellos puede repetirse en ninguna posición
// y además los caracteres no pueden estar juntos.
function sixthValidation(password){
    let specialChars = '(!@#$%ˆ&*-_+=?)'.split('');
    let passwordSpecialChars = [];
    for (let i=0; i < password.length; i++ ){
        let char = password.charAt(i);
        let n = specialChars.indexOf(char);
        if (n !== -1){
            if (passwordSpecialChars.indexOf(char) !== -1) {
                return false;
            }
            passwordSpecialChars.push(char);
            if (i !== (password.length - 1)) {
                let nextChar = password.charAt(i+1);
                if (specialChars.indexOf(nextChar) !== -1){
                    return false;
                }
            } 
        }
    }
    console.log(passwordSpecialChars)
    if (passwordSpecialChars.length < 2){
        return false;
    } 
    return true;
}

// No se puede usar el número 0.
function seventhValidation(password){
    return !password.includes('0');
}

// No se puede colocar espacios.
function eighthValidation(password){
    return !password.includes(' ');
}

function printValidation(event){
    event.preventDefault();
    if (allValidations()) {
        resultText.innerHTML = "<strong>Sí</strong>";
    } else {
        resultText.innerHTML = "<strong>No</strong>";
    }
}

function allValidations(){
    
    let password = inputPassword.value;
    
    if (
        firstValidation(password) &&
        secondValidation(password) &&
        thirdValidation(password) &&
        fourthValidator(password) &&
        fifthValidation(password) &&
        sixthValidation(password) &&
        seventhValidation(password) &&
        eighthValidation(password)
        ){
        return true;
    }

    return false
}



buttonSubmit.addEventListener('click', printValidation);
