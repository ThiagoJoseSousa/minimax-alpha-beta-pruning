import board from './minimax';

const createdBoard= board.board();
test('board is setup', ()=>{
  expect(createdBoard.length).toBe(3);
});
test('all possibilities are get', ()=>{
  expect(board.getEmpty(createdBoard).length).toBe(9);
});

test('empty', ()=>{
  expect(board.getEmpty(createdBoard).length).toBe(9);
});

test('minimax should return draw (0)', ()=> {
  expect(board.minimax(createdBoard, 9, false)[0]).toBe(0);
});

test('minimax should return lose, we are maxing', ()=> {
  createdBoard[0][0]='X'; createdBoard[0][2]='X';
  expect(board.minimax(createdBoard, 7, true)[0]).toBeLessThan(0);
});

// to attack, we getEmpty again and pass board.minimax()[1][0] and board.minimax()[1][1] variable.


test.skip('testing if functions arguments points to the same memory', ()=>{
  function IhaveArg(arg=0) {
    IWantYourArg(arg);
    return arg;
  }

  function IWantYourArg(arg) {
    arg+=1;
  }

  expect(IhaveArg()).toBe(1);
});
