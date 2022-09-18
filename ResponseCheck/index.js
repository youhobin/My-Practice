const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;
let endTime;
const records = [];
let timeOutId;
function screenClick() {
    if($screen.className === 'waiting'){
        $screen.classList.remove('waiting');
        $screen.classList.add('ready');
        $screen.textContent = '초록색이 되면 클릭하세요';
        timeOutId = setTimeout(() => {
            startTime = new Date();
            $screen.classList.remove('ready');
            $screen.classList.add('now');
            $screen.textContent = '지금 클릭하세요';
        }, Math.floor(Math.random() * 1000) + 2000);
    } else if ($screen.className === 'ready') {
        clearTimeout(timeOutId);
        $screen.classList.remove('ready');
        $screen.classList.add('waiting');
        $screen.textContent = '너무 성급하시군요';
    } else if ($screen.className === 'now') {
        endTime = new Date();
        currentTime = endTime - startTime;
        records.push(currentTime);
        const averageTime = records.reduce((a,c) => a + c )/records.length;
        $result.textContent = `현재 기록 : ${currentTime}ms, 평균 기록: ${averageTime}ms`;
        startTime = null;
        endTime = null;
        $screen.classList.remove('now');
        $screen.classList.add('waiting');
        $screen.textContent = '클릭해서 시작하세요';
        const topFive = records.sort((a,b) => (a - b)).slice(0,5);
        topFive.forEach((el,i) => {
            $result.append(
                document.createElement('br'),
                `${i + 1}위 : ${el}ms`,
            );
        })
    }
}

$screen.addEventListener('click', screenClick);