const buttonShowHide = document.querySelector(".password--display");
const inputPassword = document.getElementById('password');
const buttonSubmit = document.querySelector('.password--submit');

const validationsContent = document.querySelector('.validations--content');
const validationsResults = document.querySelector('.validations--result');
const validationsUl = document.querySelector('.validations__ul');

let successMessages = [];
let failMessages = [];

// Debe tener al menos 16 caracteres.
function firstValidation(password){
    if (password.length >= 16) {
        successMessages.push('Contiene 16 o más caracteres');
        return true;
    }
    failMessages.push('Contiene menos de 16 caracteres');
    return false;
}

// Debe tener letras minúsculas y mayúsculas.
function secondValidation(password){
    if ( 
        (password.toLowerCase() === password.toUpperCase()) ||
        (password.toUpperCase() === password) ||
        (password.toLowerCase() === password) 
    ) {
        failMessages.push('Debe contener tando minúsculas, como mayúsculas');
        return false;
    }
    successMessages.push('Contiene letras minúsculas y mayúsculas');
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
            (currentChar.toLowerCase() == nextChar.toLowerCase())
            ){
                failMessages.push('Contiene dos letras iguales consecutivas');
                return false;
            }
    }
    successMessages.push('No contiene dos letras iguales consecutivas');
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
        failMessages.push('Contiene menos de 4 números');
        return false;
    }
    
    successMessages.push('Contiene 4 números o más');
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
                failMessages.push('Tiene 2 números iguales consecutivos');
                return false;
            }
    }
    successMessages.push('No tiene 2 números iguales consecutivos');
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
                failMessages.push('Se repiten los caracteres especiales');
                return false;
            }
            passwordSpecialChars.push(char);
            if (i !== (password.length - 1)) {
                let nextChar = password.charAt(i+1);
                if (specialChars.indexOf(nextChar) !== -1){
                    failMessages.push('Los caracteres especiales son consecutivos');
                    return false;
                }
            } 
        }
    }
    if (passwordSpecialChars.length < 2){
        failMessages.push('Deben haber 2 o más caracteres especiales');
        return false;
    }

    successMessages.push('Tiene 2 o más caracteres especiales consecutivos. No se repiten. Y no son consecutivos');
    return true;
}

// No se puede usar el número 0.
function seventhValidation(password){
    if (password.includes('0')) {
        failMessages.push('Contiene algun cero');
        return false;
    }
    successMessages.push('No contiene cero');
    return true;
}

// No se puede colocar espacios.
function eighthValidation(password){
    if (password.includes(' ')) {
        failMessages.push('Contiene espacios en blanco');
        return false;
    }
    successMessages.push('No contiene espacios en blanco');
    return true;
}


function allValidations(){
    
    let password = inputPassword.value;
    
    let validationsArray = [
        firstValidation(password),
        secondValidation(password),
        thirdValidation(password),
        fourthValidator(password),
        fifthValidation(password),
        sixthValidation(password),
        seventhValidation(password),
        eighthValidation(password)
    ]

    if (validationsArray.includes(false)){
        return false;
    }
    
    return true
}

function fillValidationMessage(){
    let successLis = [];
    let failLis = [];
    let checkSymbol = '✓';
    let failSymbol = 'X';
    
    for (let successMessage of successMessages){
        let li = document.createElement('li');
        let spanCheck = document.createElement('span');
        let spanExplain = document.createElement('span');

        spanCheck.classList.add('success--check');
        spanExplain.classList.add('success--explain');

        spanCheck.innerText = checkSymbol;
        spanExplain.innerText = successMessage;

        li.append(spanCheck, spanExplain);

        successLis.push(li);
    }

    for (let failMessage of failMessages){
        let li = document.createElement('li');
        let spanCheck = document.createElement('span');
        let spanExplain = document.createElement('span');

        spanCheck.classList.add('fail--check');
        spanExplain.classList.add('fail--explain');

        spanCheck.innerText = failSymbol;
        spanExplain.innerText = failMessage;

        li.append(spanCheck, spanExplain);

        failLis.push(li);
    }

    validationsUl.replaceChildren(...successLis);
    validationsUl.append(...failLis);
}

function realTimeValidate(event){
    let value = event.target.value;
    successMessages = [];
    failMessages = [];
    let isValid = allValidations(value);

    if (isValid){
        validationsResults.innerText = "Valido";
        validationsResults.classList.remove('invalid--result');
    } else {
        validationsResults.innerText = "Invalido";
        validationsResults.classList.add('invalid--result');
    }

    validationsUl.innerHTML = "";
    fillValidationMessage();
}


buttonShowHide.addEventListener('click', (event) => {
    event.preventDefault();
    if (inputPassword.type === "password"){
        inputPassword.type = "text";
        event.target.innerText = "Ocultar";
        buttonShowHide.classList.add('hide-color');
    } else {
        inputPassword.type = "password";
        event.target.innerText = "Mostrar";
        buttonShowHide.classList.remove('hide-color');
    }
})

inputPassword.addEventListener('input', realTimeValidate);
