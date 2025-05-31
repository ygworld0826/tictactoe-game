const boardElem = document.getElementById('board');
const statusElem = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
let board, current, gameOver;

function initGame() {
  board = Array(9).fill('');
  current = 'X';
  gameOver = false;
  drawBoard();
  statusElem.innerText = current + ' 차례입니다';
}

function drawBoard() {
  boardElem.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerText = board[i];
    cell.addEventListener('click', () => handleMove(i));
    boardElem.appendChild(cell);
  }
}

function handleMove(idx) {
  if (gameOver || board[idx]) return;
  board[idx] = current;
  drawBoard();
  const winInfo = checkWin();
  if (winInfo) {
    gameOver = true;
    statusElem.innerText = winInfo.winner + ' 승리!';
    highlightWinner(winInfo.line);
  } else if (board.every(cell => cell)) {
    gameOver = true;
    statusElem.innerText = '무승부!';
  } else {
    current = current === 'X' ? 'O' : 'X';
    statusElem.innerText = current + ' 차례입니다';
  }
}

function checkWin() {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // 가로
    [0,3,6],[1,4,7],[2,5,8], // 세로
    [0,4,8],[2,4,6]          // 대각선
  ];
  for (const line of lines) {
    const [a,b,c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

function highlightWinner(line) {
  for (let i = 0; i < 9; i++) {
    if (line.includes(i)) {
      boardElem.children[i].classList.add('winner');
    }
  }
}

resetBtn.addEventListener('click', initGame);

initGame();