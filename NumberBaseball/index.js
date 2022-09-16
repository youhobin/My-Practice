const $form = document.querySelector('#form');
const $input = document.querySelector('#input');
const $logs = document.querySelector('#logs');

const arr = [];
for (let i = 0; i <9; i++) {
    arr.push(i+1);
}


const answer = [];
for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * (arr.length));
    answer.push(arr[random]);
    arr.splice(random, 1);
}

const tries = [];

function checkNumber(value) {
    if (isNaN(value)) {
        return alert('숫자를 입력해주세요')
    } else if (value.length !== 4){
        return alert('4자리를 입력해주세요')
    } else if (new Set(value).size !== 4) {
        return alert('중복되지 않게 ')
    } else if (tries.includes(value)) {
        return alert('이미 시도한 값입니다')
    }

    return true
}

function defeated() {
    const message = document.createTextNode(`패배. 정답은 ${answer.join('')}`);
    $logs.appendChild(message);
}

let out = 0;
function onSubmit(event) {
    event.preventDefault();
    const value = $input.value;
    $input.value = '';
    if (!checkNumber(value)) {
        return;
    }

    if(answer.join('') === value) {
        $logs.textContent = '홈런';
        return;
    }
    if (tries.length >= 9) {
        defeated();
        return;
    }
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < answer.length; i++) {
        const index = value.indexOf(answer[i]);
        if (index > -1) {
            if(index === i) {
                strike +=1;
            } else {
                ball +=1;
            }
        }
    }
    if (strike === 0 && ball === 0){
        out += 1;
        $logs.append(`${value}:${out} 아웃`, document.createElement('br'));
    } else {
        $logs.append(`${value}:${strike}스트라이크 ${ball}볼`, document.createElement('br'));
    }
    
    if(out === 3) {
        defeated();
        return;
    }
   
    tries.push(value);
}


$form.addEventListener('submit',onSubmit);