// this creates a board

const board = () => {
  const board1 = [new Array(3), new Array(3), new Array(3)];

  for (let x = 0; x < board1.length; x++) {
    for (let y = 0; y < board1[x].length; y++) {
      board1[x][y] = '_';
    }
  }

  return board1;
};

// this gets the empty squares x and y
const getEmpty = (gameState) => {
  return gameState.reduce((accumulator, curr, x) => {
    for (let y = 0; y < 3; y++) {
      if (curr[y] === '_') {
        accumulator.push([x, y]);
      }
    }
    return accumulator;
  }, []);
};

// computer is O, maximizer is O
const minimax = (possibleBoard, depth, isMax, alpha=-Infinity, beta=+Infinity) => {
  const gameStatus = gameCheck(possibleBoard, depth);
  if (gameStatus) {
    return [gameStatus];
  }
  if (depth === 0) {
    return [0]; // its a draw
  }

  const possibilities = getEmpty(possibleBoard);
  let index = 0;
  if (isMax) {
    // we need this value to be really low to make the first comparison, adding a check for 'undefined' is costly.
    let minimumValue = -Infinity;

    possibilities.every((possibleMove, i) => {
      // creates a new board, if i change directly the original is changed
      const newBoard = JSON.parse(JSON.stringify(possibleBoard));
      newBoard[possibleMove[0]][possibleMove[1]] = 'O'; // computer is 'O'
      const val = minimax(newBoard, depth - 1, false, alpha, beta);
      if (val[0] > minimumValue) {
        minimumValue = val[0];
        index = i;
      }
      if (alpha<=minimumValue) {
        alpha=minimumValue;
      }
      if (alpha>=beta) {
        return false;
      } else {
        return true;
      }
    });
    return [minimumValue, index];
  } else {
    // turn of the minimizer
    // we need this value to be really high to make the first comparison, adding a check for 'undefined' is costly.
    let maximumValue = +Infinity;

    possibilities.every((possibleMove, i) => {
      // creates a new board, if i change directly the original is changed
      const newBoard = JSON.parse(JSON.stringify(possibleBoard));
      newBoard[possibleMove[0]][possibleMove[1]] = 'X';
      const val = minimax(newBoard, depth - 1, true, alpha, beta);
      if (val[0] < maximumValue) {
        maximumValue = val[0];
        index = i;
      }
      if (beta>=maximumValue) {
        beta=maximumValue;
      }
      if (alpha>=beta) {
        return false;
      } else {
        return true;
      }
    });
    return [maximumValue, index];
  }
};

// evaluator function
function gameCheck(gameState, depth) {
  for (let x = 0; x < 3; x++) {
    if (
      gameState[x][0] !== '_' &&
      gameState[x][0] === gameState[x][1] &&
      gameState[x][0] === gameState[x][2]
    ) {
      if (gameState[x][0] === 'O') {
        return 70-depth;
      } else {
        return -70+depth;
      }
    }
  }
  for (let y = 0; y < 3; y++) {
    if (
      gameState[0][y] !== '_' &&
      gameState[0][y] === gameState[1][y] &&
      gameState[0][y] === gameState[2][y]
    ) {
      if (gameState[0][y] === 'O') {
        return 70-depth;
      } else {
        return -70+depth;
      }
    }
  }
  if (
    gameState[0][0] !== '_' &&
    gameState[0][0] === gameState[1][1] &&
    gameState[0][0] === gameState[2][2]
  ) {
    if (gameState[0][0] === 'O') {
      return 70-depth;
    } else {
      return -70+depth;
    }
  }
  if (
    gameState[2][0] !== '_' &&
    gameState[1][1] === gameState[2][0] &&
    gameState[2][0] === gameState[0][2]
  ) {
    if (gameState[2][0] === 'O') {
      return 70-depth;
    } else {
      return -70+depth;
    }
  }
}



export default {board, getEmpty, minimax};
