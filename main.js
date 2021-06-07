const game = document.querySelector('#game');
const field = game.querySelector('.field');
const modal = document.querySelector('.modal');
const startBtn = document.querySelector('#start');

let rowsNum = 20;
let colsNum = 30;
let gamers = ['gamer1', 'gamer2']
let gamerNum = 0;

let rows = fillField(field, rowsNum, colsNum);
let cols = getColumns(rows);
let firstDiagns = getFirstDiagns(rows);
let secondDiagns = getSecondDiags(rows);
let lines = rows.concat(cols, firstDiagns, secondDiagns);

function checkWin(gamer, lines) {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 4; j < lines[i].length; j++) {
      if (
        lines[i][j - 4].classList.contains(gamer) &&
        lines[i][j - 3].classList.contains(gamer) &&
        lines[i][j - 2].classList.contains(gamer) &&
        lines[i][j - 1].classList.contains(gamer) &&
        lines[i][j].classList.contains(gamer)) {
        return true;
      }
    }
  }
  return false;
}

function isWin(gamers, lines) {
  for (let gamer of gamers) {
    if (checkWin(gamer, lines)) {
      endGame(gamer);
      break;
    }
  }
}

function endGame(gamer) {
  alert(`${gamer} is win!`);
  freezeField(field);
}

function freezeField(field) {
  let cells = field.querySelectorAll('td');
  for (let elem of cells) {
    elem.removeEventListener('click', cellClickHandler)
  }
}

function fillField(field, rowsNum, colsNum) {
  let rows = [];

  for (let i = 0; i < rowsNum; i++) {
    let tr = document.createElement('tr');
    rows[i] = [];

    for (let j = 0; j < colsNum; j++) {
      let td = document.createElement('td');

      tr.append(td);

      td.addEventListener('click', cellClickHandler);
      rows[i][j] = td;
    }

    field.append(tr);
  }

  return rows;
}

function cellClickHandler() {
  this.classList.add(gamers[gamerNum]);
  this.removeEventListener('click', cellClickHandler);

  isWin(gamers, lines);

  gamerNum++;
  if (gamerNum === gamers.length) {
    gamerNum = 0;
  }
}

function getColumns(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (result[j] === undefined) {
        result[j] = []
      }

      result[j][i] = arr[i][j];
    }
  }
  return result;
}

function getFirstDiagns(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (result[j + j] === undefined) {
        result[i + j] = [];
      }

      result[i + j].push(arr[i][j]);
    }
  }
  return result;
}

function getSecondDiags(arr) {
  return getFirstDiagns(reverseSubArrs(arr));
}

function reverseSubArrs(arr) {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = arr[i].length; j >= 0; j--) {
      if (result[i] === undefined) {
        result[i] = [];
      }

      result[i].push(arr[i][j]);
    }
  }
  return result;
}

startBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  game.classList.remove('hidden');
})
