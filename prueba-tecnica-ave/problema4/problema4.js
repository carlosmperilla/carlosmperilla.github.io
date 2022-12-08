// let numericArray = [1,200,34,1533, 23,545,1020, 11];
const inputNumber = document.getElementById('input-numbers');
const buttonSubmit = document.querySelector('#solution button[type="submit"]');
const subsectionOne = document.querySelector('.inciso-1');
const subsectionTwoA = document.querySelector('.inciso-2a');
const subsectionTwoB = document.querySelector('.inciso-2b');
const subsectionThree = document.querySelector('.inciso-3');
const subsectionFourA = document.querySelector('.inciso-4a');
const subsectionFourB = document.querySelector('.inciso-4b');
const subsectionFiveA = document.querySelector('.inciso-5a');
const subsectionFiveB = document.querySelector('.inciso-5b');

// Inciso 2
function evenPercentage(array){
    let totalNumbers = array.length;
    let evenNumbers = 0;
    for (let number of array){
        if (number % 2 == 0){
            evenNumbers++;
        }
    }
    return (evenNumbers/totalNumbers)*100
}

function oddPercentage(array){
    return 100 - evenPercentage(array)
}

// Inciso 3
function gtThousandPercentage(array){
    let totalNumbers = array.length;
    let n = array.filter( (num) => num > 1000 ).length;
    return (n/totalNumbers)*100;
}

// Inciso 5
function getAverage(array){
    let average = array.reduce((a, b) => a + b) / array.length;
    return average;
}

function percentageByMaxNum(otherNum, array){
    let maxNum = Math.max(...array);
    return (otherNum/maxNum)*100
}

// Uso del DOM y eventos
function fillAnswers(numericArray){
    subsectionOne.innerText = numericArray.length;
    subsectionTwoA.innerText = evenPercentage(numericArray);
    subsectionTwoB.innerText = oddPercentage(numericArray);
    subsectionThree.innerText = gtThousandPercentage(numericArray);
    subsectionFourA.innerText = Math.max(...numericArray);
    subsectionFourB.innerText = Math.min(...numericArray);
    subsectionFiveA.innerText = percentageByMaxNum(Math.min(...numericArray), numericArray);
    subsectionFiveB.innerText = percentageByMaxNum(getAverage(numericArray), numericArray);
}


buttonSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    let stringNumbers = inputNumber.value.split(',');
    let numericArray = stringNumbers.map( (strNum) => parseInt(strNum) );
    numericArray = numericArray.filter( (num) => !isNaN(num) );
    fillAnswers(numericArray);
})