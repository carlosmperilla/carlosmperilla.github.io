let numberOneA = document.getElementById('number1-a');
let numberTwoA = document.getElementById('number2-a');
let buttonFormA = document.getElementById('multiplication--form-a__button');
let resultsA = document.getElementById('results-a');

let numberOneB = document.getElementById('number1-b');
let numberTwoB = document.getElementById('number2-b');
let buttonFormB = document.getElementById('multiplication--form-b__button');
let resultsB = document.getElementById('results-b');


function solutionOne(event){
    event.preventDefault();
    let n1 = parseInt(numberOneA.value);
    let n2 = parseInt(numberTwoA.value);
    resultsA.innerText = Math.imul(n1, n2);
}

function solutionTwo(event) {
    event.preventDefault();
    let n1 = parseInt(numberOneB.value);
    let n2 = parseInt(numberTwoB.value);
    let multResult = 0;
    
    for (let nAux=0; nAux<Math.abs(n2); nAux++){
        multResult += Math.abs(n1);
    }
    if (Math.sign(n1) !== Math.sign(n2)){
        multResult = -multResult;
    }
    resultsB.innerText = multResult;
}

buttonFormA.addEventListener('click', solutionOne);
buttonFormB.addEventListener('click', solutionTwo);