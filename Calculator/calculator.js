const numberOne = document.querySelector('#num-1');
const numberTwo = document.querySelector('#num-2');
const numberThree = document.querySelector('#num-3');
const numberFour = document.querySelector('#num-4');
const numberFive = document.querySelector('#num-5');
const numberSix = document.querySelector('#num-6');
const numberSeven = document.querySelector('#num-7');
const numberEight = document.querySelector('#num-8');
const numberNine = document.querySelector('#num-9');
const numberZero = document.querySelector('#num-0');
const $display = document.querySelector('#display');
const $divide = document.querySelector('#divide');
const $multiply = document.querySelector('#multiply');
const $minus = document.querySelector('#minus');
const $plus = document.querySelector('#plus');
const $calculate = document.querySelector('#calculate');
const $reset = document.querySelector('#reset');
const $op = document.querySelector('.op');

let calculator1 = '';
let operator = '';
let calculator2 = '';

function numBtnClick(event) {
    if(calculator1 && operator) {
        calculator2 += event.target.textContent;
        $display.value = calculator2;
    } else {
        calculator1 += event.target.textContent;
        $display.value = calculator1;
    }
}

function opBtnClick(event) {
    if (calculator2) {
        switch (operator) {
            case "+":
            $display.value = parseInt(calculator1) + parseInt(calculator2);
            break;
            case "-":
            $display.value = calculator1 - calculator2;
            break;
            case "*":
            $display.value = calculator1 * calculator2;
            break;
            case "/":
            $display.value = calculator1 / calculator2;
            break;
            default:
            break;
        }
        calculator1 = $display.value;
        calculator2 = "";
    }

    if(calculator1) { // 여기 나중에 고치기
        operator = event.target.textContent;
        
        // const curop = operator;
        // if (curop === operator) {
        //     this.style.backgroundColor = 'white';
        //     this.style.color='rgb(243, 166, 22)';
        // } else {
        //     this.style.backgroundColor = 'rgb(243, 166, 22)';
        //     this.style.color='white';
        // }


        // if(operator !== event.target.textContent) {
        //     this.style.backgroundColor = 'white';
        //     this.style.color='rgb(243, 166, 22)';
        // } else {
        //     this.style.backgroundColor = 'white';
        //     this.style.color='rgb(243, 166, 22)';
        // }
    }

    // if(operator && calculator1) {
    //     $op.style.backgroundColor = 'rgb(243, 166, 22)';
    //     $op.style.color = 'white';
    //     operator = event.target.textContent;
    // }
}

function calBtnClick() { 
    if (!calculator2) { //여기도  그냥 =만 눌렀을때
        calculator2 = calculator1;
    }
    
    if(calculator2) {
        switch (operator) {
            case "+":
            $display.value = parseInt(calculator1) + parseInt(calculator2);
            break;
            case "-":
            $display.value = calculator1 - calculator2;
            break;
            case "*":
            $display.value = calculator1 * calculator2;
            break;
            case "/":
            $display.value = calculator1 / calculator2;
            break;
            default:
            break;
        }
        calculator1 = $display.value;
        calculator2 = '';
    }
}

function resetBtnClick() {
    $display.value='';
    calculator1 = '';
    calculator2 = '';
    operator = '';
}

numberOne.addEventListener('click', numBtnClick);
numberTwo.addEventListener('click', numBtnClick);
numberThree.addEventListener('click', numBtnClick);
numberFour.addEventListener('click', numBtnClick);
numberFive.addEventListener('click', numBtnClick);
numberSix.addEventListener('click', numBtnClick);
numberSeven.addEventListener('click', numBtnClick);
numberEight.addEventListener('click', numBtnClick);
numberNine.addEventListener('click', numBtnClick);
numberZero.addEventListener('click', numBtnClick);

$divide.addEventListener('click', opBtnClick);
$multiply.addEventListener('click', opBtnClick);
$minus.addEventListener('click', opBtnClick);
$plus.addEventListener('click', opBtnClick);

$calculate.addEventListener('click', calBtnClick);
$reset.addEventListener('click', resetBtnClick);