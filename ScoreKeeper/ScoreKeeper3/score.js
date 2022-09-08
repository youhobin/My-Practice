const $playerOneBtn = document.querySelector('#playerOneBtn');
const $playerTwoBtn = document.querySelector('#playerTwoBtn');
const $resetBtn = document.querySelector('#resetBtn');
const playerOneScore = document.querySelector('#playerOneScore');
const playerTwoScore = document.querySelector('#playerTwoScore');
const $playerOneWin = document.querySelector('#playerOneWin');
const $playerTwoWin = document.querySelector('#playerTwoWin');
const $totalScore = document.querySelector('#total-score');



function playerOneBtnClicked() {
    if (Number(playerOneScore.innerText) !== Number($totalScore.value)) {
        playerOneScore.innerText = Number(playerOneScore.innerText) + 1;
    } else {
        playerOneScore.style.color = 'green';
        playerTwoScore.style.color = 'red';
        $playerOneWin.classList.remove('hidden');
    }   
}

function playerTwoBtnClicked() {
    if (Number(playerTwoScore.innerText) !== Number($totalScore.value)) {
        playerTwoScore.innerText = Number(playerTwoScore.innerText) + 1;
    } else {
        playerTwoScore.style.color = 'green';
        playerTwoScore.style.color = 'red';
        $playerOneWin.classList.remove('hidden');
    }   




//     playerTwoScore.innerText = Number(playerTwoScore.innerText) + 1;
//     if (Number(playerTwoScore.innerText) === Number($totalScore.value)/**몇판인지 */ ) {
//         playerTwoScore.style.color = 'green';
//         playerOneScore.style.color = 'red';
//         $playerTwoWin.classList.remove('hidden');
//     }
// }
}
function resetBtnClicked() {
    playerOneScore.innerText = 0;
    playerTwoScore.innerText = 0;
    playerTwoScore.style.color = 'black';
    playerOneScore.style.color = 'black';
    $playerOneWin.classList.add('hidden');
    $playerTwoWin.classList.add('hidden');

}

$playerOneBtn.addEventListener('click', playerOneBtnClicked);
$playerTwoBtn.addEventListener('click', playerTwoBtnClicked);
$resetBtn.addEventListener('click', resetBtnClicked);