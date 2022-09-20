const $form = document.querySelector('#form');
const $tbody = document.querySelector('#table tbody');
const $timer = document.querySelector('#timer');
const $result = document.querySelector('#result');
let row;
let cell;
let mine;
const CODE = {
    NORMAL: -1, // 닫힌 칸(지뢰 없음)
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    MINE: -6,
    OPENED: 0, // 0 이상이면 다모두 열린 칸
};
let data;
let openCount;
let startTime;
let interval;

function onSubmit(event) {
    event.preventDefault();
    row = parseInt(event.target.row.value);
    cell = parseInt(event.target.cell.value);
    mine = parseInt(event.target.mine.value);
    openCount = 0;
    clearInterval(interval);
    $tbody.innerHTML = '';
    drawTable();
    startTime = new Date();
    interval = setInterval(() => {
      const time = Math.floor((new Date() - startTime) / 1000);
      $timer.textContent = `${time}초`;
    }, 1000);
}

$form.addEventListener('submit', onSubmit);

function plantMine() {
    const candidate = Array(row * cell).fill().map((el,i) => {
        return i;
    });

    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < mine; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    return data;
}

function onRightClick(event) {
    event.preventDefault();
    const target = event.target; // td로 이벤트 버블링으로 우클릭한 td가됨.
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const cellData = data[rowIndex][cellIndex];
    if (cellData === CODE.MINE) { // 지뢰면
        data[rowIndex][cellIndex] = CODE.QUESTION_MINE; // 물음표 지뢰로
        target.className = 'question';
        target.textContent = '?';
      } else if (cellData === CODE.QUESTION_MINE) { // 물음표 지뢰면
        data[rowIndex][cellIndex] = CODE.FLAG_MINE; // 깃발 지뢰로
        target.className = 'flag';
        target.textContent = '!';
      } else if (cellData === CODE.FLAG_MINE) { // 깃발 지뢰면
        data[rowIndex][cellIndex] = CODE.MINE; // 지뢰로
        target.className = '';
        target.textContent = '';
      } else if (cellData === CODE.NORMAL) { // 닫힌 칸이면
        data[rowIndex][cellIndex] = CODE.QUESTION; // 물음표로
        target.className = 'question';
        target.textContent = '?';
      } else if (cellData === CODE.QUESTION) { // 물음표면
        data[rowIndex][cellIndex] = CODE.FLAG; // 깃발으로
        target.className = 'flag';
        target.textContent = '!';
      } else if (cellData === CODE.FLAG) { // 깃발이면
        data[rowIndex][cellIndex] = CODE.NORMAL; // 닫힌 칸으로
        target.className = '';
        target.textContent = '';
      }
}

function countMine(rowIndex, cellIndex) {
    const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
    let i = 0;
    mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
    mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
    mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
    mines.includes(data[rowIndex][cellIndex - 1]) && i++;
    mines.includes(data[rowIndex][cellIndex + 1]) && i++;
    mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
    mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
    mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
    return i;
    // && 앞에 가 트루면 i++실행. 즉 data 의 주변이 지뢰를 갖고있으면 
    // ?. 연산자는 앞에가 있으면 하고 아니면 뒤에꺼로??
}

function open(rowIndex, cellIndex) {
    if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return;
    const target = $tbody.children[rowIndex]?.children[cellIndex];
    if (!target) {
        return;
    }
    const count = countMine(rowIndex, cellIndex);
    target.textContent = count || '';
    target.className = 'opened';
    data[rowIndex][cellIndex] = count;
    openCount++;
    console.log(openCount);
    if (openCount === row * cell - mine) {
        const time = (new Date() - startTime) / 1000;
        clearInterval(interval);
        $tbody.removeEventListener('contextmenu', onRightClick);
        $tbody.removeEventListener('click', onLeftClick);
        setTimeout(() => {
          alert(`승리했습니다! ${time}초가 걸렸습니다.`);
        }, 500);
    }
    return count;
}

function openAround(rI, cI) {
  setTimeout(() => {
    const count = open(rI, cI);
    if (count === 0) {
      openAround(rI - 1, cI - 1);
      openAround(rI - 1, cI);
      openAround(rI - 1, cI + 1);
      openAround(rI, cI - 1);
      openAround(rI, cI + 1);
      openAround(rI + 1, cI - 1);
      openAround(rI + 1, cI);
      openAround(rI + 1, cI + 1);
    }
  }, 0);
}

function onLeftClick(event) {
    const target = event.target; 
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    const cellData = data[rowIndex][cellIndex];
    if (cellData === CODE.NORMAL) {
        openAround(rowIndex, cellIndex);
    } else if (cellData === CODE.MINE) {
        target.textContent = '펑';
        target.className = 'opened';
        clearInterval(interval);
        $tbody.removeEventListener('contextmenu', onRightClick);
        $tbody.removeEventListener('click', onLeftClick);

    }
}

function drawTable() {
    data = plantMine();
    data.forEach((row) => {
        const $tr = document.createElement('tr');
        row.forEach((cell) => {
            const $td = document.createElement('td');
            if(cell === CODE.MINE) {
                // $td.textContent = 'X';  개발용/ 사용시 주석처리
            }
            $tr.append($td);
        })
        $tbody.append($tr);
        $tbody.addEventListener('contextmenu', onRightClick);
        $tbody.addEventListener('click', onLeftClick);
    })
}