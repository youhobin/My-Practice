const p1 = {
    score:0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display'),
}

const p2 = {
    score:0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display'),
}

const p3 = {
    score:0,
    button:document.querySelector('#p3Button'),
    display: document.querySelector('#p3Display')
}

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');

let winningScore = parseInt(winningScoreSelect.value);
let isGameOver = false;

function updateScores(player, opponent, opponent2){
    if(!isGameOver) {
        player.score += 1
        if (player.score === winningScore ) {
            isGameOver = true;
            player.display.classList.add('winner');
            opponent.display.classList.add('loser');
            opponent2.display.classList.add('loser');
        }
        player.display.textContent = player.score;
    }
}

p1.button.addEventListener('click', function () {
    updateScores(p1, p2, p3);
})

p2.button.addEventListener('click', function () {
    updateScores(p2, p1, p3);
})

p3.button.addEventListener('click', function () {
    updateScores(p3, p1, p2);
})

winningScoreSelect.addEventListener('change', function() {
    winningScore = parseInt(this.value);
    reset();
})

resetButton.addEventListener('click', reset)

function reset(){
    isGameOver = false;
    for (let p of [p1, p2, p3]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('winner', 'loser');
    }

}