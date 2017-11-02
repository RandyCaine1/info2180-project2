//Extra Done: Game Time (Grade This)


"use strict";

(function(){

  window.addEventListener("load", load);
  var rows_columns = 4;
  var EX = 3;
  var EY = 3;
  var start_time = 0; //Game start time
  var timer; // variable for timer 
  var total_time = 0; // total gameplay time
  var best_time = 0;
  var best_moves = 0;


  function load(){   
    drawPuzzle(); 
  }
    var sec = 0; //Time in seconds
    var moves = 0; //moves the player has made
 
     //timer function
     var timer = function(){
     var exp = document.querySelector(".explanation");
     var interval = setInterval(function(){
       sec++;
       exp.innerHTML = "Time Taken: "+sec+" seconds "+"Moves Made: "+moves;
     }, 1000);
   };

  function drawPuzzle(){  //Function to draw the puzzle area
      var puzzleArea = document.getElementById("puzzlearea");
      var tile = puzzleArea.children;
      $("#shufflebutton").click(shuffle);
      var i = 0;
      for(var y = 0; y < rows_columns; y++){
        for(var x =0; x < rows_columns; x++){
          tile[i].classList.add("puzzlepiece");
          tile[i].style.left = 100 * x + "px";
          tile[i].style.top = 100 * y + "px";
          tile[i].setAttribute("id", "xy(" + x + "," + y + ")");
          tile[i].onmouseover = highlight;
          tile[i].onmouseout = unhighlight;
          tile[i].onclick = clicktoMove;
          tile[i].style.backgroundPosition = (0 - 100 * x) + "px" + " " + (0 - 100 * y) + "px"; //Line to style each individual tile with picture.
          i++;         
        }
      }
  }

  function moveable(tile){
    var surrounding = getSurrounding();
    if(surrounding.indexOf(tile.getAttribute("id")) != -1){
      return true;
    }else{
      return false;
    }
  }
  //Function to find coordinates of surrounding tiles and assist in determining possible moves
  function getSurrounding(){
    var up = "xy(" + EX + "," + (EY-1) + ")";
    var down = "xy(" + EX + "," + (EY+1) + ")";
    var right = "xy(" + (EX-1) + "," + EY + ")";
    var left = "xy(" + (EX+1) + "," + EY + ")";

    var surrounding = [up, down, left, right];
    var moveableTile= [];

    for(var i = 0; i < surrounding.length; i++){
      if(document.getElementById(surrounding[i]) != null){
        moveableTile.push(surrounding[i]);
      }
    }
    return moveableTile;
  }
  //Helper function to highlight movable piece
  function highlight(){
    if(moveable(this)){
      this.classList.add("movablepiece");
    }
  }
  //Helper function to unhighlight movable piece when mouse removed
  function unhighlight(){
    if(moveable(this)){
      this.classList.remove("movablepiece");
    }
  }
  //Helper function in moving tiles
  function clicktoMove(){
    moveTile(this);
    moves++;
  }

  function moveTile(tile){ 
      var tempY = EY;
      var tempX = EX;
      if(moveable(tile)){
        EX = parseInt(tile.style.left)/100;
        EY = parseInt(tile.style.top)/100;
        $(tile).fadeOut(300);        
        tile.style.left = (tempX * 100) + "px";
        tile.style.top = (tempY * 100) + "px";
        tile.setAttribute("id", "xy(" + tempX + "," + tempY + ")");
        $(tile).fadeIn(300);
      }
      
  }

  function shuffler(tile){ 
      var tempY = EY;
      var tempX = EX;
      if(moveable(tile)){
        EX = parseInt(tile.style.left)/100;
        EY = parseInt(tile.style.top)/100;
        tile.style.left = (tempX * 100) + "px";
        tile.style.top = (tempY * 100) + "px";
        tile.setAttribute("id", "xy(" + tempX + "," + tempY + ")");
      }
  }

  function shuffle(){ //Function to shuffle the tiles
    for (var i = 0; i < 1000; i++) {
      var surrounding = getSurrounding();
      var rand = parseInt(Math.random() * surrounding.length);
      var tile = document.getElementById(surrounding[rand]);
      shuffler(tile);
    }
    timer();
  }


})();