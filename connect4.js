// data stucture-
// array of array rows.
// easier to print out and find connections
var prompt = require('prompt');
prompt.start();


function Board(){
  this.board = [
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null]
              ];
}

Board.prototype.render = function(){
  process.stdout.write('\u001B[2J\u001B[0;0f');
  for(var i = 0; i < this.board.length; i++){
    var mappingArray = this.board[i].map(function(el){
      if(el === null){
        return ' ';
      } else {
        return el;
      }
    });
    console.log(mappingArray.join('|'));
  }
}

Board.prototype.markColumn = function(column, player){
  for(var i = this.board.length-1; i >= 0; i--){
    if(this.board[i][column] === null){
      this.board[i][column] = player;
      return true;
    }
  }
  return false;

}

Board.prototype.checkWins = function(column, player){
  // row checking
  for(var i = 0; i < this.board.length; i++){
    var row = this.board[i];
    var counter = 0;
    for(var j = 0; j < row.length; j++){
      if(row[j] === player){
        counter++;
        if(counter === 4){
          return true;
        }
      } else {
        counter = 0;
      }
    }
  }
  //column checking
  var columnCounter = 0;
  for(var i = 0; i < this.board.length; i++){
    if(this.board[i][column] === player){
      columnCounter++;
      if(columnCounter === 4){
        return true;
      }
    } else {
      columnCounter = 0;
    }
  }

  //diagonal checking
  for(var diagonalSum = 0; diagonalSum <= 11; diagonalSum++){
    var diagonalCounter = 0;
    for(var x = 0; x <= diagonalSum; x++){
      y = diagonalSum - x;
      if(this.board[x] === undefined){
        continue;
      }
      if(this.board[x][y] === player){
        diagonalCounter++;
        if(diagonalCounter === 4){
          return true;
        }
      } else {
        diagonalCounter = 0;
      }
    }
  }
  /// for homework, check the other diagonal
  for(var diagonalDiff = 6; diagonalDiff >= -5; diagonalDiff--){
    var y = 0;
    var otherDiagonalCounter = 0;
      for(var x = 0; x < 7; x++){
        y = diagonalDiff + x;
        if(this.board[x] === undefined){
          continue;
        }
        if(y < 7){
          if(this.board[x][y] === player){
            otherDiagonalCounter++;
            if(otherDiagonalCounter === 4){
              return true;
            }
          } else {
            otherDiagonalCounter = 0;
          }

        } else {
          break;
        }
      }
    }

  return false;
}

// check for draws
// research how to output colors in the terminal

function playerTurn(player){
  console.log('it is ' + player + "'s turn");
  prompt.get(['column'], function(err, result){
    if (err) { return onErr(err); }
    // console.log(result.column);
    var playerColumn = result.column - 1;
    if(newGame.markColumn(playerColumn, player)){
      newGame.render();
      if(newGame.checkWins(playerColumn, player)){
        return console.log(player + ' won');;
      }
      if(player === 'x'){
        playerTurn('o');
      } else {
        playerTurn('x');
      }
    } else {
      console.log('this column is full');
      playerTurn(player);
    }
  });
}


function onErr(err) {
  console.log(err);
  return 1;
}

var newGame = new Board();
newGame.render();
playerTurn('x');




//player color: red or yellow, whose turn
//'dropping' the piece w/ current player, no overlapping
// check for wins
// check for draws

//
